import * as THREE from 'three';

interface ReflectConstructorProps {
	scene: THREE.Scene;
	streaks: THREE.Mesh;
	glow: THREE.Mesh;
	streakTexture: THREE.Texture;
	glowTexture: THREE.Texture;
}

export class Reflect {
	private readonly MAX_REFLECTIONS: number = 10;
	private readonly start: THREE.Vector3;
	private readonly end: THREE.Vector3;
	private readonly raycaster: THREE.Raycaster;
	private readonly scene: THREE.Scene;
	private readonly streaks: THREE.Mesh;
	private readonly glow: THREE.Mesh;
	private readonly streakTexture: THREE.Texture;
	private readonly glowTexture: THREE.Texture;

	private positions: THREE.Vector3[];
	private range: number;
	private positionsBuffer: Float32Array;

	constructor({ scene, streaks, glow, streakTexture, glowTexture }: ReflectConstructorProps) {
		this.scene = scene;
		this.streaks = streaks;
		this.glow = glow;
		this.streakTexture = streakTexture;
		this.glowTexture = glowTexture;

		this.range = 0;
		this.positions = [];
		this.start = new THREE.Vector3();
		this.end = new THREE.Vector3();
		this.raycaster = new THREE.Raycaster();

		this.positionsBuffer = new Float32Array(this.MAX_REFLECTIONS * 3);

		// Initialize with default ray
		this.setRay([10, 5, 0], [0, 0, 0]);
		this.update();
	}

	public setRay(
		start: [number, number, number] = [0, 0, 0],
		end: [number, number, number] = [0, 0, 0]
	): void {
		this.start.set(...start);
		this.end.set(...end);
	}

	public update(): void {
		this.positions = [this.start.clone()];
		let currentPos = this.start.clone();
		let direction = new THREE.Vector3().subVectors(this.end, this.start).normalize();

		// Cast rays and calculate reflection points
		for (let i = 0; i < this.MAX_REFLECTIONS; i++) {
			this.raycaster.set(currentPos, direction);
			const intersects = this.raycaster.intersectObjects(this.scene.children, true);

			if (intersects.length > 0) {
				const hit = intersects[0];
				const hitPoint = hit.point.clone();
				this.positions.push(hitPoint);

				if (hit.face) {
					// Calculate reflection direction
					direction.reflect(hit.face.normal);
					// Continue from the hit point
					currentPos = hitPoint;
				} else {
					// If no face normal is available, just continue in the same direction
					currentPos = hitPoint.add(direction);
					break;
				}
			} else {
				// If no intersection, extend the ray in the current direction
				const finalPos = currentPos.clone().add(direction.multiplyScalar(100));
				this.positions.push(finalPos);
				break;
			}
		}

		this.range = this.positions.length;
		this.updatePositionBuffer();
	}

	private updatePositionBuffer(): void {
		for (let i = 0; i < this.positions.length; i++) {
			const baseIndex = i * 3;
			this.positionsBuffer[baseIndex] = this.positions[i].x;
			this.positionsBuffer[baseIndex + 1] = this.positions[i].y;
			this.positionsBuffer[baseIndex + 2] = this.positions[i].z;
		}
	}

	public getPositionAt(progress: number): THREE.Vector3 {
		if (this.positions.length < 2) return new THREE.Vector3();

		const maxIndex = this.positions.length - 1;
		const indexFloat = progress * maxIndex;
		const index = Math.floor(indexFloat);
		const nextIndex = Math.min(index + 1, maxIndex);
		const segmentProgress = indexFloat - index;

		return new THREE.Vector3().lerpVectors(
			this.positions[index],
			this.positions[nextIndex],
			segmentProgress
		);
	}

	public updateRay(): void {
		this.update();
	}

	public getRange(): number {
		return this.range;
	}

	public getPositions(): THREE.Vector3[] {
		return [...this.positions];
	}

	public getPositionsBuffer(): Float32Array {
		return this.positionsBuffer;
	}
}
