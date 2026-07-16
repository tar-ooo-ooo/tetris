export class Cell {
  private element: HTMLDivElement = document.createElement("div");

  constructor(
    private x: number,
    private y: number,
  ) {
    this.render();
  }

  private createCell = () => {
    this.element.className = "cell";
  };

  private render = () => {
    this.createCell();

    this.element.style.left = `${5 + this.x * 40}px`;
    this.element.style.top = `${5 + this.y * 40}px`;
  };

  public getCell = () => {
    return this.element;
  };
}
