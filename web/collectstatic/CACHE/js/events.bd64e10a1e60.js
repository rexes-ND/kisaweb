$(function(){register='register';deregister='deregister';register_selector='.'+register;deregister_selector='.'+deregister;$(register_selector+', '+deregister_selector).on('click',function(){type_register=$(this).hasClass(register);type_deregister=$(this).hasClass(deregister);if(type_register){type='register';}
else{type='deregister';}
if(type_register||(type_deregister&&confirm('Do you want to deregister from this event?'))){$.ajax({type:'POST',url:$(this).attr('data-event-registration-url'),data:{'type':type,'csrfmiddlewaretoken':CSRF_TOKEN,},success:(response)=>{if(response=='Success'){if(type_register){$(this).removeClass(register).addClass(deregister);$(this).removeClass('btn-success').addClass('btn-secondary');$(this).html('Deregister');}
else{$(this).removeClass(deregister).addClass(register);$(this).removeClass('btn-secondary').addClass('btn-success');$(this).html('Register');}
$selector=$(this).siblings('.occupancy');text=$selector.html();number=parseInt(text.match(/\d+/));change=(type_register)?-1:1;if(text.indexOf('seats left')>=0){$selector.html(text.replace(/\d+/,String(number+change)));}}
else if(response=='Full'){alert('Sorry, we have reached full capacity for this event. Please read the event description for possible registration at the venue.');}
else{alert(response);alert('Error1');}},error:()=>{alert('Error0');},});}});});;$(function(){input_selector='input[name="truncate_num"]';input_init_val=$(input_selector).attr('value');edit_selector='.edit';edit_mode_selector='.edit_mode';cancel_selector='.cancel';max_selector='.max';save_selector='.save';event_description_selector='.event-description';read_more_selector='.read-more';function get_input_selector($this){return $this.parent().siblings(input_selector);}
function get_truncated_text($input){max=parseInt($input.attr('max'));value=parseInt($input.val());$.ajax({type:'POST',url:$input.attr('data-modify-truncated-descr-url'),data:{'num':parseInt($input.val()),'csrfmiddlewaretoken':CSRF_TOKEN,},success:(response)=>{if(response){$input.parent().siblings(event_description_selector).html(response);$read_more=$input.parent().siblings(read_more_selector);if(max>value&&value>=parseInt($input.attr('min'))){$read_more.show();}
else{$read_more.hide();}}},error:()=>{alert('Error');},});}
$(edit_selector).on('click',function(){$(this).hide();$(this).siblings(edit_mode_selector).show();$(this).siblings(input_selector).prop('disabled',false);});$(cancel_selector).on('click',function(){$(this).parent().hide();$(this).parent().siblings(edit_selector).show();$input=get_input_selector($(this));$input.val(input_init_val).prop('disabled',true);get_truncated_text($input);});$(input_selector).change(function(){if(parseInt($(this).val())<parseInt($(this).attr('min'))){$(this).val($(this).attr('min'));}
get_truncated_text($(this));});$(max_selector).on('click',function(){$input=get_input_selector($(this));$input.val($input.attr('max'));get_truncated_text($input);});$(save_selector).on('click',function(){$input=get_input_selector($(this));$.ajax({type:'POST',url:$(this).attr('data-modify-truncate-num-url'),data:{'num':parseInt($input.val()),'csrfmiddlewaretoken':CSRF_TOKEN,},success:(response)=>{if(response=='Success'){$(this).parent().hide();$(this).parent().siblings(edit_selector).show()
$input.prop('disabled',true);}},error:()=>{alert('Error');},});});});;