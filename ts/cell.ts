export class Cell {
  private element: HTMLDivElement = document.createElement("div");

  constructor(
    private x: number,
    private y: number,
  ) {
    this.createCell();
    this.render();
  }

  private createCell = () => {
    this.element.className = "cell";
  };

  private render = () => {
    this.element.style.left = `${this.x * 30}px`;
    this.element.style.top = `${this.y * 30}px`;
    document.body.appendChild(this.element);
  };
}
