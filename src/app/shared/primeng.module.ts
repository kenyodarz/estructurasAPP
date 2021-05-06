// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// PrimeNG
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FieldsetModule } from 'primeng/fieldset';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MenuModule } from 'primeng/menu';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';


const myModule = [
  ConfirmDialogModule,
  MessageModule,
  MessagesModule,
  ToastModule,
  TableModule,
  DialogModule,
  PanelModule,
  MenubarModule,
  InputTextModule,
  PaginatorModule,
  SelectButtonModule,
  FieldsetModule,
  StepsModule,
  TabViewModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  InputMaskModule,
  CheckboxModule,
  FormsModule,
  RadioButtonModule,
  InputTextareaModule,
  KeyFilterModule,
  ToggleButtonModule,
  MenuModule,
  AccordionModule,
  ToolbarModule,
  SplitButtonModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule],
})
export class PrimengModule {}
