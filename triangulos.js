class Triangulos {
  constructor() {
    this.columnas;
    this.filas;
    this.anchoGrilla;
    this.altoGrilla;
    this.margenX;
    this.margenY;
    this.img;
    this.trianguloActual = 0;
    this.millisAnterior = 0;

    //este valor es proporcional al tiempo de generacion de triangulos, mas chico es , mas rapido se generan
    this.tiempo = 300; 
  
 
  }


  dibujar() {

    translate(-width / 2, -height / 2);

    this.columnas = 5;
    this.filas = 5;
    this.anchoGrilla = width * 1.2;
    this.altoGrilla = height * 1.2;
    this.margenX = (this.anchoGrilla - width) / 2;
    this.margenY = (this.altoGrilla - height) / 2;

    if (this.trianguloActual < this.columnas * this.filas) {
      if (millis() - this.millisAnterior >= this.tiempo) {
        let i = Math.floor(this.trianguloActual / this.filas);
        let j = this.trianguloActual % this.filas;
        this.generarTriangulo(i, j);
        this.trianguloActual++;
        this.millisAnterior = millis();
      }
    }
  }

  generarTriangulo(i, j) {
    let x1, y1, x2, y2, x3, y3, x4, y4;

    x1 = map(i, 0, this.columnas, -this.margenX, this.anchoGrilla - this.margenX);
    y1 = map(j, 0, this.filas, -this.margenY, this.altoGrilla - this.margenY);
    x2 = map(i, -1, this.columnas - 1, -this.margenX, this.anchoGrilla - this.margenX);
    y2 = map(j, 0, this.filas, -this.margenY, this.altoGrilla - this.margenY);
    x3 = map(i, 0, this.columnas, -this.margenX, this.anchoGrilla - this.margenX);
    y3 = map(j, -1, this.filas - 1, -this.margenY, this.altoGrilla - this.margenY);
    x4 = map(i, -1, this.columnas - 1, -this.margenX, this.anchoGrilla - this.margenX);
    y4 = map(j, -1, this.filas - 1, -this.margenY, this.altoGrilla - this.margenY);

    let n1 = noise(x1, y1) * 100;
    let n2 = noise(x2, y2) * 100;
    let n3 = noise(x3, y3) * 100;
    let n4 = noise(x4, y4) * 100;

    let a1 = noise(x1, y1) * 360;
    let a2 = noise(x2, y2) * 360;
    let a3 = noise(x3, y3) * 360;
    let a4 = noise(x4, y4) * 360;

    x1 = x1 + n1 * cos(radians(a1));
    x2 = x2 + n2 * cos(radians(a2));
    x3 = x3 + n3 * cos(radians(a3));
    x4 = x4 + n4 * cos(radians(a4));
    y1 = y1 + n1 * sin(radians(a1));
    y2 = y2 + n2 * sin(radians(a2));
    y3 = y3 + n3 * sin(radians(a3));
    y4 = y4 + n4 * sin(radians(a4));

    strokeWeight(4);

    triangle(x1, y1, x2, y2, x4, y4);
    triangle(x3, y3, x4, y4, x1, y1);

  }
}
