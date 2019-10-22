import { Component, OnInit } from '@angular/core';
import { IProduct } from './IProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  /**
   * List of Products
   */
  private productsList: IProduct[] = [];
  /**
   * Product - Used to edition - Initialized with empty value
   */
  private product: IProduct = { title: '', id: 0 };

  /**
   * Messages to be showed
   */
  private message: {
    type: string;
    content: string;
  };

  constructor() { }

  ngOnInit() {
  }

  /**
   * Method used to Add a new Product to our Array
   */
  private async saveItem() {
    // Minimal of two characters
    if (this.product.title.length > 2) {
      // It's a new Item
      if (this.product.id === 0) {
        this.addItem();
      } else {
        this.editItem();
      }
      // Clean product object
      this.product = {
        title: '',
        id: 0
      };
    } else {
      this.message = {
        type: "danger",
        content: "Precisa ter no mínimo 2 caracteres."
      };
    }
  }

  /**
   * Method used to save a new Item
   */
  private addItem() {
    this.productsList.push({
      id: this.getID(),
      title: this.product.title,
    });
    this.message = {
      type: "success",
      content: "Produto cadastrado com sucesso."
    };
  }

  private editItem(){
    const productIndex = this.productsList
    .findIndex((product) => product.id === this.product.id);
    this.productsList[productIndex].title = this.product.title;
    this.message = {
      type: "success",
      content: "Produto editado com sucesso!"
    };
  }

  /**
   * This method removes selected item from List
   * @param itemId to be deleted
   */
  private async removeItem(itemId: number) {
    const indexToRemove = this.productsList.findIndex((product) => product.id === itemId);
    this.productsList.splice(indexToRemove, 1);
    this.message = {
      type: "success",
      content: "Produto removido com sucesso!"
    };
  }

  /**
   * This method get the selected Item and populate all necessary fields
   * @param itemId to be edited
   */
  private startEdition(itemId: number) {
    const productIndex = this.productsList
    .findIndex((product) => product.id === itemId);
    this.product = this.productsList[productIndex];
  }

  /**
   * This method checks what was the last grather ID at the Product List
   * and gives this ID + 1 as ID.
   */
  private getID(): number {
    // Define initial ID as 1
    let productId = 1;
    // If there is already records, take the last grather ID and increment to have the ID
    if (this.productsList.length > 0) {
      // tslint:disable-next-line:arrow-return-shorthand
      productId = Math.max.apply(Math, this.productsList.map((o: IProduct) => { return o.id; } ));
      productId += 1;
    }
    return productId;
  }

}


