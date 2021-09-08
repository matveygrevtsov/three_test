import * as THREE from 'three'

interface AnimatorProps {
  root: HTMLDivElement
}

export class Animator {
  private readonly root: HTMLDivElement
  private readonly scene: THREE.Scene
  private readonly camera: THREE.PerspectiveCamera
  private readonly renderer: THREE.WebGLRenderer
  private requestAnimation: number

  constructor({ root }: AnimatorProps) {
    this.root = root

    // Объявляем сцену
    this.scene = new THREE.Scene()
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.9))

    // Объявляем камеру
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.root.clientWidth / this.root.clientHeight,
      0.1,
      1000,
    )
    this.camera.position.z = 10

    // Объявляем renderer
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true

    // Добавляем кубик
    const geometry = new THREE.BoxGeometry(7, 7, 7)
    const material = new THREE.MeshBasicMaterial({ color: 0xff99ff })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)

    this.requestAnimation = 0

    window.addEventListener('resize', () => this.resize())
  }

  private resize() {
    const width = this.root.clientWidth
    const height = this.root.clientHeight

    // Update camera
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  private animate = (): void => {
    this.renderer.render(this.scene, this.camera)
    this.requestAnimation = requestAnimationFrame(this.animate)
  }

  public start() {
    this.root.appendChild(this.renderer.domElement)

    this.requestAnimation = requestAnimationFrame(this.animate)
    this.resize()
  }

  public destroy() {
    cancelAnimationFrame(this.requestAnimation)
  }
}
