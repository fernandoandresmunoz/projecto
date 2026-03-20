import { Component, Input, OnInit } from '@angular/core';
import { Automata } from 'cube';
import { ChannelController } from '../channel-controller';
import { ConcreteChannelController } from '../concrete-channel-controller';

@Component({
  selector: 'app-convolution',
  templateUrl: './convolution.component.html',
  styleUrls: ['./convolution.component.styl']
})
export class ConvolutionComponent implements OnInit {

  @Input() automata: Automata;

  channelController: ChannelController;

  channels = [
    1, 2, 3, 4, 5
  ]

  constructor() {
    // this.channelController = new ConcreteChannelController(this.automata);

    // console.log(this.channelController.getChannel(0));
  }

  ngOnInit(): void {

    this.channelController = new ConcreteChannelController(this.automata);

  }

}
