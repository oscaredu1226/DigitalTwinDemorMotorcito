import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import * as THREE from 'three';
import { MotorStatus } from '../../../domain/models/motor-status.model';

@Component({
  selector: 'app-motor-3d-viewer',
  standalone: true,
  templateUrl: './motor-3d-viewer.component.html',
  styleUrl: './motor-3d-viewer.component.css',
})
export class Motor3dViewerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('viewerContainer', { static: true })
  private readonly viewerContainer!: ElementRef<HTMLDivElement>;

  @Input({ required: true }) status!: MotorStatus;
  @Input() rpm = 0;
  @Input() vibration = 0;
  @Input() temperature = 0;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private motorGroup = new THREE.Group();
  private fanGroup = new THREE.Group();
  private shaftGroup = new THREE.Group();

  private motorMaterials: THREE.MeshStandardMaterial[] = [];
  private animationFrameId = 0;

  private readonly initialMotorPosition = new THREE.Vector3(0, 0, 0);
  private elapsedTime = 0;

  ngAfterViewInit(): void {
    this.initScene();
    this.createMotor();
    this.updateMotorColor();
    this.animate();

    window.addEventListener('resize', this.handleResize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['status'] || changes['temperature']) && this.motorMaterials.length > 0) {
      this.updateMotorColor();
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.handleResize);

    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();

        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });

    this.renderer.dispose();
  }

  private initScene(): void {
    const container = this.viewerContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(4.2, 2.6, 5.2);
    this.camera.lookAt(0, 0.4, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 6, 5);
    this.scene.add(directionalLight);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(3.2, 64),
      new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.85,
      }),
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.78;
    this.scene.add(floor);
  }

  private createMotor(): void {
    this.motorGroup.clear();
    this.motorMaterials = [];
    this.shaftGroup.clear();

    const mainMaterial = new THREE.MeshStandardMaterial({
      color: this.getStatusColor(),
      metalness: 0.25,
      roughness: 0.38,
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.35,
      roughness: 0.45,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.65,
      roughness: 0.25,
    });

    this.motorMaterials.push(mainMaterial);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 2.2, 48), mainMaterial);

    body.rotation.z = Math.PI / 2;
    body.position.set(0, 0.25, 0);
    this.motorGroup.add(body);

    const frontCover = new THREE.Mesh(
      new THREE.CylinderGeometry(0.82, 0.82, 0.18, 48),
      mainMaterial,
    );

    frontCover.rotation.z = Math.PI / 2;
    frontCover.position.set(-1.2, 0.25, 0);
    this.motorGroup.add(frontCover);

    const rearCover = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.22, 48), darkMaterial);

    rearCover.rotation.z = Math.PI / 2;
    rearCover.position.set(1.22, 0.25, 0);
    this.motorGroup.add(rearCover);

    this.createShaft(metalMaterial);
    this.createTopBox(mainMaterial);
    this.createCoolingFins(mainMaterial);
    this.createFan(darkMaterial);
    this.createBase(darkMaterial);

    this.motorGroup.rotation.y = -0.35;
    this.scene.add(this.motorGroup);
  }

  private createShaft(material: THREE.MeshStandardMaterial): void {
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.85, 32), material);

    shaft.rotation.z = Math.PI / 2;

    const shaftMark = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.05, 0.36),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.2,
        roughness: 0.3,
      }),
    );

    shaftMark.position.set(0, 0.16, 0);

    this.shaftGroup.add(shaft);
    this.shaftGroup.add(shaftMark);
    this.shaftGroup.position.set(-1.78, 0.25, 0);
    this.motorGroup.add(this.shaftGroup);
  }

  private createTopBox(material: THREE.MeshStandardMaterial): void {
    const topBox = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.42, 0.75), material);

    topBox.position.set(0, 1.04, 0);
    this.motorGroup.add(topBox);
  }

  private createCoolingFins(material: THREE.MeshStandardMaterial): void {
    for (let i = 0; i < 7; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.85, 1.65), material);

      fin.position.set(-0.72 + i * 0.24, 0.25, 0);
      this.motorGroup.add(fin);
    }
  }

  private createFan(material: THREE.MeshStandardMaterial): void {
    this.fanGroup.clear();

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.08, 24), material);

    hub.rotation.z = Math.PI / 2;
    this.fanGroup.add(hub);

    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.09, 0.2), material);

      blade.position.x = 0.28;
      blade.rotation.z = (Math.PI / 2) * i;
      this.fanGroup.add(blade);
    }

    this.fanGroup.position.set(1.38, 0.25, 0);
    this.fanGroup.rotation.y = Math.PI / 2;
    this.motorGroup.add(this.fanGroup);
  }

  private createBase(material: THREE.MeshStandardMaterial): void {
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.22, 1.15), material);

    base.position.set(0, -0.72, 0);
    this.motorGroup.add(base);

    const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.9), material);

    leftFoot.position.set(-0.7, -0.45, 0);
    this.motorGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.9), material);

    rightFoot.position.set(0.7, -0.45, 0);
    this.motorGroup.add(rightFoot);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    this.elapsedTime += 0.016;

    this.motorGroup.rotation.y += 0.002;

    const rpmFactor = this.getRpmRotationFactor();

    this.fanGroup.rotation.x += rpmFactor;
    this.shaftGroup.rotation.x += rpmFactor;

    this.applyVibrationEffect();

    this.renderer.render(this.scene, this.camera);
  };

  private updateMotorColor(): void {
    const color = this.getStatusColor();

    this.motorMaterials.forEach((material) => {
      material.color.setHex(color);
    });
  }

  private getStatusColor(): number {
    const normalizedTemperature = Math.max(0, Math.min(this.temperature, 120)) / 120;

    const coldColor = new THREE.Color(0x2563eb);
    const warmColor = new THREE.Color(0xf59e0b);
    const hotColor = new THREE.Color(0xef4444);

    if (this.temperature <= 80) {
      const factor = normalizedTemperature / (80 / 120);
      return coldColor.lerp(warmColor, factor * 0.75).getHex();
    }

    const factor = (this.temperature - 80) / 40;
    return warmColor.lerp(hotColor, Math.min(factor, 1)).getHex();
  }

  private getRpmRotationFactor(): number {
    const normalizedRpm = Math.max(0, Math.min(this.rpm, 3600));
    const minSpeed = 0.02;
    const maxSpeed = 0.45;

    return minSpeed + (normalizedRpm / 3600) * maxSpeed;
  }

  private applyVibrationEffect(): void {
    if (this.vibration <= 3.0) {
      this.motorGroup.position.copy(this.initialMotorPosition);
      return;
    }

    const vibrationIntensity = Math.min((this.vibration - 3.0) / 2.0, 1);
    const amplitude = 0.015 + vibrationIntensity * 0.045;

    const offsetX = Math.sin(this.elapsedTime * 80) * amplitude;
    const offsetY = Math.cos(this.elapsedTime * 95) * amplitude * 0.6;

    this.motorGroup.position.set(offsetX, offsetY, 0);
  }

  private handleResize = (): void => {
    const container = this.viewerContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  };
}
