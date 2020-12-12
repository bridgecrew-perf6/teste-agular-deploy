import { ComponentEvent } from './component-event';
import { Subject } from 'rxjs';
export class ComponentEventHandler<actionT, dataT> {
  private eventEmmiter: Subject<ComponentEvent<actionT, dataT>> = new Subject();
  onEvent = this.eventEmmiter.asObservable();

  constructor() {}

  dispatchAction(action: ComponentEvent<actionT, dataT>) {
    this.eventEmmiter.next(action);
  }
}
