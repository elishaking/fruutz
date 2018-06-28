import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as tf from '@tensorflow/tfjs';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private camera: Camera) {
    
  }

  ionViewDidEnter(){
    tf.loadModel('assets/tfjs_model/fruits_2_5_30/model.json').then((fruits_model) => {
      // console.log(fruits_model.toJSON());
      let img = new Image(224, 224);
      img.src = "assets/imgs/test_imgs/apricot.jpg";
      const ex = tf.cast(tf.expandDims(tf.fromPixels(img), 0), "float32");
      // ex.reshape([1, 100, 100, 3]);
      const prediction = fruits_model.predict(ex);
      console.log(prediction.toString());
    });
  }

  takePhoto(){
    this.camera.getPicture({
      allowEdit: true,
      correctOrientation: false,
      targetHeight: 100,
      targetWidth: 100,
      saveToPhotoAlbum: true,
    }).then((image) => {
      console.log(image);
    });
  }

}
