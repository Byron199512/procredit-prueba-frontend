

export const MonthDiff =(dateStart :Date = new Date(), dateEnd: Date= new Date() ) : number=>{
  var months;
   months = (dateEnd.getFullYear() - dateStart.getFullYear()) * 12; months -= dateStart.getMonth();
   months += dateEnd.getMonth();
   return months <= 0 ? 0 : months;

}
