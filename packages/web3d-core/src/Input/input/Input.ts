import { Scene } from "../../Scene";

export enum KeyCode {
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90
};

export class Input {

    private static keyPressed: Map<number, boolean>;

    private static onKeyDown = (event: KeyboardEvent) => {
        Input.keyPressed.set(event.key.charCodeAt(0)^32, true);
    }

    private static onKeyUp = (event: KeyboardEvent) => {
        Input.keyPressed.set(event.key.charCodeAt(0)^32, false);
    }
    
    public static activateInputSystem() {
        Input.keyPressed = new Map<KeyCode, boolean>();

        window.addEventListener('keydown', Input.onKeyDown);
        window.addEventListener('keyup', Input.onKeyUp);
    }

    public static cleanInputSystem() {
        window.removeEventListener('keydown', Input.onKeyDown);
        window.removeEventListener('keyup', Input.onKeyUp);
    }

    public static IsKeyPressed(keyCode: KeyCode): boolean {
        return Input.keyPressed.get(keyCode);
    }
}