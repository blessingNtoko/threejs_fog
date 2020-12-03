import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public scene = new THREE.Scene();
  public renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  public camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 5);
  public controls = new OrbitControls(this.camera, this.renderer.domElement);
  public directLight = new THREE.DirectionalLight('white', 1);

  ngOnInit() {
    this.init();
  }

  public init() {
    // =============================================================== initial Setup ===========================================================

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    {
      const near = 1;
      const far = 2;
      const color = 'lightblue';
      this.scene.fog = new THREE.Fog(color, near, far);
      this.scene.background = new THREE.Color(color);
    }

    this.directLight.position.set(-1, 2, 4);
    this.scene.add(this.directLight);

    this.controls.update();
    this.camera.position.z = 2;

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const cubes = [
      this.makeInstance(geometry, 0x44aa88, 0),
      this.makeInstance(geometry, 0x8844aa, 0),
      this.makeInstance(geometry, 0x44aa88, 0)
    ]

    // =============================================================== Resize ===========================================================

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);

    // =============================================================== Animate ===========================================================

    const animate = (time) => {
      time *= .001; // convert into seconds

      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rotation = time * speed;
        cube.rotation.x = rotation;
        cube.rotation.y = rotation;
      });

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

  }

  public makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({
      color
    });

    const obj3D = new THREE.Mesh(geometry, material);
    this.scene.add(obj3D);

    obj3D.position.x = x;

    return obj3D;
  }
}
