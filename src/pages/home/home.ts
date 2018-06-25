import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  ionViewDidEnter(){
    tf.loadModel('assets/tfjs_model/fruits_2_5_30/model.json').then((fruits_model) => {
      // console.log(fruits_model.toJSON());
      let img = new Image(100, 100);
      img.src = "assets/imgs/test_imgs/apricot.jpg";
      const ex = tf.expandDims(tf.fromPixels(img));
      const prediction = fruits_model.predict(ex);
      console.log(prediction);
    });
  }

}
