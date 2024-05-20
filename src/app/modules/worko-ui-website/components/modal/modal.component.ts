import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap/modal/modal-config';
import { ModalCloseResult } from '../../interfaces/shared.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('modalRef') modalRef!: ElementRef;

  @Output() closeResult: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  @Input() ariaLabelledBy: string = 'modal-basic-title';
  @Input() bodyClass: string = '';
  @Input() buttonText: string = 'OK';
  @Input() centered: boolean = false;
  @Input() class: string = '';
  @Input() footerClass: string = '';
  @Input() headerClass: string = '';
  @Input() message: string = '';
  @Input() showConfirmButton: boolean = false;
  @Input() showFooter: boolean = true;
  @Input() showHeader: boolean = true;
  @Input() textCenter: boolean = true;
  @Input() theme: string = '';
  @Input() title: string = 'MODAL_TITLE.ERROR';
  @Input() showClose: boolean = false;
  @Input() modalSize: string = 'lg';
  /**
   * ModalComponent constructor.
   *
   * @param {NgbModal} modalService
   */
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
   
    console.log(this.showHeader);
  }

  /**
   * Open.
   *
   * @returns {void}
   */
  open(): void {
    // console.log(this.modalSize);
    // console.log(this.showClose);
    const modalOptions: NgbModalOptions = {
      ariaLabelledBy: this.ariaLabelledBy,
      windowClass: `${this.theme} ${this.class}`.trim(),
      centered: this.centered,
      size:  this.modalSize,
      backdrop: 'static'
    };

    this.modalService.open(this.modalRef, modalOptions).result.then(
      result => this.closeResult.emit(result),
      reason => this.closeResult.emit(ModalComponent.getDismissReason(reason))
    );
  }

  openModalWithStaticBackdrop() {
    this.modalService.open(this.modalRef, { backdrop: 'static' });
  }

  close() {
    // Perform any necessary cleanup or actions before closing the modal

    // Emit the 'closed' event
    this.modalService.dismissAll('button');
  }

  /**
   * Get dismiss reason.
   *
   * @param {ModalDismissReasons | string | number} reason
   * @returns {string}
   */
  private static getDismissReason(reason: ModalDismissReasons | string | number): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return ModalCloseResult.ESC;
      case ModalDismissReasons.BACKDROP_CLICK:
        return ModalCloseResult.BACKDROP;
      default:
        return `${reason}`;
    }
  }

  /**
   * Cancel.
   *
   * @returns {void}
   */
  cancel(): void {
    this.modalService.dismissAll('button');
  }

  redirectClick(): void {
    this.onClick.emit();
  }
}
