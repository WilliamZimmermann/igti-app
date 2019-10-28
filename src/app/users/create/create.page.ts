import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { ToastController, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  private user: User;
  private error: string;
  private title: string = "Cadastrar";
  private flagEdit: boolean = false;

  constructor(
    private service: UserService,
    public toastController: ToastController,
    public navCtrl: NavController, ) {
    // Initialize our User object
    this.user = new User(null, null, null, null, null, null, null);
    // If it's a edition
    if (sessionStorage.getItem('user')) {
      this.flagEdit = true;
      this.title = 'Editar';
      this.user = JSON.parse(sessionStorage.getItem('user'));
      console.log(this.user);
    }
  }

  ngOnInit() {
  }

  submit() {
    let errors = false;
    if (this.user.name === "" || this.user.name == null) {
      this.presentToast('O nome é obrigatório');
      errors = true;
    }
    if (this.user.username === "" || this.user.username == null) {
      this.presentToast('O username é obrigatório');
      errors = true;
    }
    if (this.user.phone === "" || this.user.phone == null) {
      this.presentToast('O celular ou telefone é obrigatório');
      errors = true;
    }
    /**
     * If there is some error, just get out of function
     */
    if (errors) {
      return;
    }
    // It's a edition
    if (sessionStorage.getItem('user')) {
            this.service.editUser(this.user)
              .pipe(first())
              .subscribe(response => { 
                console.log(response);
                this.navCtrl.navigateRoot(''); 
              },
                err => {
                  console.log(err);
                  return this.error = "Erro de conexão!";
                }
              );
      } else {
            this.user.img_url = 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png';
            this.service.addUser(this.user)
            .pipe(first())
            .subscribe(response => {
              console.log(response);
              this.navCtrl.navigateRoot('');
            }, err => {
                console.log(err);
                return this.error = "Erro de conexão!";
            });
      }
  }

  /**
   * Present a toast message
   * @param {string} msg to show
   */
  private async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  /**
   * Request to the service to delete the user
   */
  private delete(): void {
    this.service.deleteUser(this.user)
      .pipe(first())
      .subscribe(response => { 
        console.log(response); 
      }, err => {
          console.log(err);
          return this.error = "Erro de conexão!";
      });
  }
}
