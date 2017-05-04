import { ToastOptions } from 'ng2-toastr';

export class ToastCustomOption extends ToastOptions {
    public animate = 'fade';
    public newestOnTop = true;
    public positionClass = 'toast-top-center';
    public showCloseButton = true;
}
