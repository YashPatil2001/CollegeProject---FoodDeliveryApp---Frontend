$(document).ready(() => {
    $('.profile').hide()
    if(localStorage.getItem('is_log_in')){
        $('.profile').show()
        $('.loginsignup').hide()
    }
})