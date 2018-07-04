import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import * as tf from '@tensorflow/tfjs';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  prediction = "None";

  constructor(public navCtrl: NavController, private camera: Camera,
    private loadingCtrl: LoadingController) {
    
  }

  ionViewDidEnter(){
    
  }

  takePhoto(){
    this.camera.getPicture({
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: false,
      targetHeight: 224,
      targetWidth: 224,
      saveToPhotoAlbum: true,
    }).then((image) => {
      // console.log(image);
      this.predictFruit(image);
    });
  }

  predictFruit(image){
    let loading = this.loadingCtrl.create({
      content: "Detecting Fruit"
    });
    loading.present();
    tf.loadModel('assets/tfjs_model/fruits_2_5_30/model.json').then((fruits_model) => {
      // console.log(fruits_model.toJSON());
      let img = new Image(224, 224);
      img.src = 'data:image/jpeg;base64,' + image;
      const ex = tf.cast(tf.expandDims(tf.fromPixels(img), 0), "float32");
      // ex.reshape([1, 100, 100, 3]);
      const prediction = fruits_model.predict(ex);
      this.prediction = prediction.toString();
      loading.dismiss();
    });
  }

}
