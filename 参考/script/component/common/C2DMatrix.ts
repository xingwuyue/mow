class Martix {
    private static _normalMatrix;
    public static get NormalMartix() {
        if (!this._normalMatrix)
            this._normalMatrix = new Martix();
        this._normalMatrix._11 = 0.0; this._normalMatrix._12 = 0.0; this._normalMatrix._13 = 0.0;
        this._normalMatrix._21 = 0.0; this._normalMatrix._22 = 0.0; this._normalMatrix._23 = 0.0;
        this._normalMatrix._31 = 0.0; this._normalMatrix._32 = 0.0; this._normalMatrix._33 = 0.0;
        return this._normalMatrix;
    };
    public _11 = 0.0; _12 = 0.0; _13 = 0.0;
    public _21 = 0.0; _22 = 0.0; _23 = 0.0;
    public _31 = 0.0; _32 = 0.0; _33 = 0.0;
    public constructor() {
        this._11 = 0.0; this._12 = 0.0; this._13 = 0.0;
        this._21 = 0.0; this._22 = 0.0; this._23 = 0.0;
        this._31 = 0.0; this._32 = 0.0; this._33 = 0.0;
    }
}

export class C2DMatrix {

    private m_Matrix: Martix;
    private static _NormalMatrix: C2DMatrix = null;

    public static get NormalMatrix() {
        if (!C2DMatrix._NormalMatrix) {
            C2DMatrix._NormalMatrix = new C2DMatrix();
        }
        C2DMatrix._NormalMatrix.Identity();
        return C2DMatrix._NormalMatrix;
    }

    public constructor() {
        this.m_Matrix = new Martix();
        this.Identity();
    }

    public TransformVector2Ds(vPoint: cc.Vec2): cc.Vec2 {
        let tempX = (this.m_Matrix._11 * vPoint.x) + (this.m_Matrix._21 * vPoint.y) + (this.m_Matrix._31);
        let tempY = (this.m_Matrix._12 * vPoint.x) + (this.m_Matrix._22 * vPoint.y) + (this.m_Matrix._32);
        vPoint.x = tempX;
        vPoint.y = tempY;
        return vPoint;
    }

    public MatrixMultiply(mIn: Martix) {
        let mat_temp: Martix = new Martix();
        //first row
        mat_temp._11 = (this.m_Matrix._11 * mIn._11) + (this.m_Matrix._12 * mIn._21) + (this.m_Matrix._13 * mIn._31);
        mat_temp._12 = (this.m_Matrix._11 * mIn._12) + (this.m_Matrix._12 * mIn._22) + (this.m_Matrix._13 * mIn._32);
        mat_temp._13 = (this.m_Matrix._11 * mIn._13) + (this.m_Matrix._12 * mIn._23) + (this.m_Matrix._13 * mIn._33);

        //second
        mat_temp._21 = (this.m_Matrix._21 * mIn._11) + (this.m_Matrix._22 * mIn._21) + (this.m_Matrix._23 * mIn._31);
        mat_temp._22 = (this.m_Matrix._21 * mIn._12) + (this.m_Matrix._22 * mIn._22) + (this.m_Matrix._23 * mIn._32);
        mat_temp._23 = (this.m_Matrix._21 * mIn._13) + (this.m_Matrix._22 * mIn._23) + (this.m_Matrix._23 * mIn._33);

        //third
        mat_temp._31 = (this.m_Matrix._31 * mIn._11) + (this.m_Matrix._32 * mIn._21) + (this.m_Matrix._33 * mIn._31);
        mat_temp._32 = (this.m_Matrix._31 * mIn._12) + (this.m_Matrix._32 * mIn._22) + (this.m_Matrix._33 * mIn._32);
        mat_temp._33 = (this.m_Matrix._31 * mIn._13) + (this.m_Matrix._32 * mIn._23) + (this.m_Matrix._33 * mIn._33);

        this.m_Matrix = mat_temp;

    }

    public Identity() {
        this.m_Matrix._11 = 1; this.m_Matrix._12 = 0; this.m_Matrix._13 = 0;

        this.m_Matrix._21 = 0; this.m_Matrix._22 = 1; this.m_Matrix._23 = 0;

        this.m_Matrix._31 = 0; this.m_Matrix._32 = 0; this.m_Matrix._33 = 1;

    }

    public Translate(x: number, y: number) {
        let mat = Martix.NormalMartix;

        mat._11 = 1; mat._12 = 0; mat._13 = 0;

        mat._21 = 0; mat._22 = 1; mat._23 = 0;

        mat._31 = x; mat._32 = y; mat._33 = 1;

        //and multiply
        this.MatrixMultiply(mat);
    }

    public Scale(xScale: number, yScale: number) {
        let mat = Martix.NormalMartix;
        mat._11 = xScale; mat._12 = 0; mat._13 = 0;

        mat._21 = 0; mat._22 = yScale; mat._23 = 0;

        mat._31 = 0; mat._32 = 0; mat._33 = 1;
        //and multiply
        this.MatrixMultiply(mat);
    }

    public Rotate(rot: number) {
        let mat = Martix.NormalMartix;
        let Sin = Math.sin(rot);
        let Cos = Math.cos(rot);

        mat._11 = Cos; mat._12 = Sin; mat._13 = 0;

        mat._21 = -Sin; mat._22 = Cos; mat._23 = 0;

        mat._31 = 0; mat._32 = 0; mat._33 = 1;
        //and multiply
        this.MatrixMultiply(mat);
    }

    public RotateVec2(fwd: cc.Vec2, side: cc.Vec2) {
        let mat = Martix.NormalMartix;
        mat._11 = fwd.x; mat._12 = fwd.y; mat._13 = 0;

        mat._21 = side.x; mat._22 = side.y; mat._23 = 0;

        mat._31 = 0; mat._32 = 0; mat._33 = 1;
        //and multiply
        this.MatrixMultiply(mat);
    }
}