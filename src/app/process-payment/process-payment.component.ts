import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-process-payment',
  templateUrl: './process-payment.component.html',
  styleUrls: ['./process-payment.component.css']
})
export class ProcessPaymentComponent implements OnInit {

  msg: string;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
   this.route.queryParamMap
      .subscribe(params => {
        this.processPayment(params.get('paymentId'), params.get('token'), params.get('PayerID'))
      });
  }

  processPayment(paymentId: string, token: string, PayerID: string): void {
    this.userService.processPayment(paymentId, token, PayerID)
      .subscribe(res => {
        if(res.state == 'approved')
          this.msg = 'Thank you for your donation!'
        else
          this.msg = 'Donation canceled!';
      });
  }

}
