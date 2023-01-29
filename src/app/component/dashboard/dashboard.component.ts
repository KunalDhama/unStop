import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Seats } from 'src/app/model/seat';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  enter_number="";


seats:Seats;
seatArray:Array<any>;
availableSeats:Array<any>;
errorMessage:string=""

constructor(private bookService: BookService){
this.seats= new Seats();
this.seatArray=[];
this.availableSeats=[]
}
  ngOnInit(): void {
    
    this.bookService.fetchDataFromServer().subscribe(response=>{
      this.seatArray=response;
      console.log(this.seatArray);
      for (let i =0; i<=11;i++){
        this.availableSeats[i]=(Number(this.seatArray[i].empty_seats))
      }
      
    },error=>{
      console.log(error)
      this.errorMessage=error.message
    }
    )
    


  }
  saveNewSeat(){
   
    var row=-1
    for (let i =0; i<=11;i++){
      if(this.seatArray[i].empty_seats>=this.enter_number){
        row=i;
        
        break;
      }
    }

    if (row>-1){
      console.log('row',row)
      console.log('avail_seats',this.availableSeats)
    
    var update=JSON.stringify(this.seatArray[row])
    console.log(update)
    
    
    update=update.substring(0,update.length-2)+(Number(this.seatArray[row].empty_seats)-Number(this.enter_number))+'}'
    this.availableSeats[row]-=Number(this.enter_number)
    console.log(update)
    console.log(JSON.parse(update))
    console.log('avail_seats',this.availableSeats)



      this.bookService.updateData(JSON.parse(update)).subscribe(res=>{
        console.log('data updated');
        this.ngOnInit()
      })
    }
  }

}
