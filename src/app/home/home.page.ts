import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonPopover, IonInput, IonDatetime, IonDatetimeButton,
	PopoverController
 } from '@ionic/angular/standalone';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonPopover, 
		IonInput, IonDatetimeButton, IonDatetime, ReactiveFormsModule, CommonModule],
})
export class HomePage implements OnInit{

	testForm!: FormGroup;
	selectedDate: any;
	minDate: string = new Date().toISOString();
	maxDate : any = (new Date()).getFullYear() + 5;
	datesList: {label:string, value: string}[] = [];

	constructor(
		private formBuilder: FormBuilder,
		private popoverController: PopoverController,
	) {}

	ngOnInit(){
		this.testForm = this.formBuilder.group({
			date: ['', Validators.required]
		});
	}

	submitForm(){

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const selectedDate = new Date(this.selectedDate);
		selectedDate.setHours(0, 0, 0, 0);

		this.datesList = [
			{ label: 'Today', value: today.toLocaleDateString('en-CA') },
			{ label: 'Yesterday', value: this.subtractDays(today, 1).toLocaleDateString('en-CA') },
			{ label: '10 days past selected date', value: this.subtractDays(selectedDate, 9).toLocaleDateString('en-CA') },
			{ label: '1 year past selected date', value: this.subtractDays(selectedDate, 365).toLocaleDateString('en-CA') },
		];
	}

	setSelectedDate(popoverDate: any){
		this.selectedDate = new Date(popoverDate).toLocaleDateString('en-CA');
		this.datesList = [];
		this.popoverController.dismiss();
	}

	subtractDays(date: Date, days:number) {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() - days);
		return newDate;
	  }
}
