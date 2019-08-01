export function showToast(message,ErrorLevel){

			toastr.options = {
 				 "closeButton": true,
  				 "debug": false,
  				 "positionClass": "toast-bottom-right",
                 "showDuration": "1000",
  				 "hideDuration": "1000",
                 "timeOut": "5000",
                 "extendedTimeOut": "1000",
                 "showEasing": "swing",
                 "hideEasing": "linear",
                 "showMethod": "fadeIn",
                 "hideMethod": "fadeOut"
            }


			switch(ErrorLevel){
				 case "ERROR": toastr.error(message);
				 break;
				 case "INFO": toastr.info(message);
				 break;
				 case "WARNING" : toastr.warning(message);
				 break;
				 case "Error": toastr.error(message);
				 break;
				 case "UNAUTHORIZED": toastr.error(message);
				 break;
				 default: toastr.success(message);
				 break;
			}

				 
}