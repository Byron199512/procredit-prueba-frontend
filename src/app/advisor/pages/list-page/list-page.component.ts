import { Component, OnChanges, ViewChild,OnInit } from '@angular/core';
import { RequestResponse } from 'src/app/shared/interfaces/request.interface';
import { RequestService } from 'src/app/shared/services/request.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.sass']
})
export class ListPageComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Fecha', 'Cliente', 'Estado', 'Tipo', "Amount", "Plazo", "getdetails",];
  dataSource = new MatTableDataSource<RequestResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private requestService: RequestService,
    public dialog: MatDialog
    ) { }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }

  ngOnInit() {
    this.requestService.getRequests().subscribe(
      requests => this.dataSource = new MatTableDataSource<RequestResponse>(requests)
    );
  }

  getRequest(request: RequestResponse) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: request
    });
    dialogRef.afterClosed().subscribe(result => {
      this.requestService.getRequests().subscribe(
        requests => this.dataSource = new MatTableDataSource<RequestResponse>(requests)
      );
    });
  }
}
