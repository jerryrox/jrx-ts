import JrxMathUtils from "../utils/JrxMathUtils";

/**
 * Class which contains the color values that can be transformed in several representations.
 */
export default class Color {
    private _r: number = 1;
    private _g: number = 1;
    private _b: number = 1;
    private _a: number = 1;

    /**
     * Red component value ranging from 0 to 1.
     */
    get r(): number {
        return this._r;
    }
    set r(value: number) {
        this._r = JrxMathUtils.clamp(value, 0, 1);
    }

    /**
     * Green component value ranging from 0 to 1.
     */
    get g(): number {
        return this._g;
    }
    set g(value: number) {
        this._g = JrxMathUtils.clamp(value, 0, 1);
    }

    /**
     * Blue component value ranging from 0 to 1.
     */
    get b(): number {
        return this._b;
    }
    set b(value: number) {
        this._b = JrxMathUtils.clamp(value, 0, 1);
    }

    /**
     * Alpha component value ranging from 0 to 1.
     */
    get a(): number {
        return this._a;
    }
    set a(value: number) {
        this._a = JrxMathUtils.clamp(value, 0, 1);
    }


    /**
     * Returns the color in hexadecimal representation.
     */
    get hex(): string {
        const r = this.componentToHex(this._r);
        const g = this.componentToHex(this._g);
        const b = this.componentToHex(this._b);
        const a = this.a >= 1 ? "" : this.componentToHex(this._a);
        return `#${r}${g}${b}${a}`;
    }

    /**
     * Returns the rgba function string representation.
     */
    get rgba(): string {
        const r = Math.floor(this._r * 255);
        const g = Math.floor(this._g * 255);
        const b = Math.floor(this._b * 255);
        return `rgba(${r}, ${g}, ${b}, ${this._a})`;
    }

    /**
     * Returns the luminance of the color.
     */
    get luminance(): number {
        return this._r * 0.299 + this._g * 0.587 + this._b * 0.114;
    }

    /**
     * Returns the hexadecimal color value of the text that would be appropriate for a background of this color.
     */
    get overlayFontColor(): string {
        return this.luminance < 0.5 ? "#fff" : "#000";
    }

    
    private constructor(r: number, g: number, b: number, a: number = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /**
     * Returns a color between from and to by interpolant t.
     */
    static lerp(from: Color, to: Color, t: number): Color {
        return new Color(
            JrxMathUtils.lerp(from.r, to.r, t),
            JrxMathUtils.lerp(from.g, to.g, t),
            JrxMathUtils.lerp(from.b, to.b, t),
            JrxMathUtils.lerp(from.a, to.a, t),
        );
    }

    /**
     * Initializes a new Color using color components.
     */
    static rgba(r: number, g: number, b: number, a: number = 1): Color {
        return new Color(r, g, b, a);
    }

    /**
     * Initializes a new Color using hexadecimal color code.
     */
    static hex(hex: string): Color {
        // Trim out hashtag.
        if (hex.startsWith("#")) {
            hex = hex.substring(1);
        }
        // Color code must have a specific length.
        if (hex.length !== 3 && hex.length !== 6 &&
            hex.length !== 4 && hex.length !== 8) {
            throw new Error(`An invalid hexadecimal color was specified: ${hex}`);
        }

        const hasAlpha = hex.length === 4 || hex.length === 8;
        const componentCount = hasAlpha ? 4 : 3;
        const componentLength = hex.length <= 4 ? 1 : 2;
        const components: number[] = [];
        for (let i = 0; i < componentCount; i++) {
            const startInx = componentLength * i;
            let comp = hex.substring(startInx, startInx + componentLength);
            if (comp.length === 1) {
                comp = `${comp}${comp}`;
            }
            components[i] = JrxMathUtils.inverseLerp(0, 255, JrxMathUtils.hexToInt(comp));
        }

        return new Color(
            components[0],
            components[1],
            components[2],
            components.length > 3 ? components[3] : 1
        );
    }

    /**
     * Returns a new instance of palette color with the same component values.
     */
    clone(): Color {
        return Color.rgba(this._r, this._g, this._b, this._a);
    }

    /**
     * Returns a clone of this object with the specified override alpha.
     */
    withAlpha(a: number): Color {
        const color = this.clone();
        color.a = a;
        return color;
    }

    /**
     * Returns a new color darkened by the specified factor.
     */
    darken(factor: number): Color {
        factor = 1 - factor;
        return Color.rgba(
            this.r * factor,
            this.g * factor,
            this.b * factor,
            this.a,
        );
    }

    /**
     * Returns a new color brightened by the specified factor.
     */
    brighten(factor: number): Color {
        return Color.rgba(
            (1 - this.r) * factor + this.r,
            (1 - this.g) * factor + this.g,
            (1 - this.b) * factor + this.b,
            this.a,
        );
    }

    /**
     * Converts the specified color component value to hexadecimal string.
     */
    private componentToHex(value: number): string {
        value = Math.floor(JrxMathUtils.clamp(value * 255, 0, 255));

        const str = value.toString(16);
        return str.length === 1 ? `0${str}` : str;
    }
}