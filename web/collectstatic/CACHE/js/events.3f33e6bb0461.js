$('#register, #deregister').on('click',function(){let $type=$(this).attr('id');if($type=='register'||($type=='deregister'&&confirm('Do you want to deregister from this event?'))){$.ajax({type:'POST',url:$(this).attr('data-event-registration-url'),data:{'type':$type,'csrfmiddlewaretoken':CSRF_TOKEN,},success:(response)=>{if(response=='Success'){if($type=='register'){$(this).attr('id','deregister');$(this).removeClass('btn-success').addClass('btn-secondary');$(this).html('Deregister');}
else{$(this).attr('id','register');$(this).removeClass('btn-secondary').addClass('btn-success');$(this).html('Register');}
let $selector=$(this).siblings('#occupancy');let text=$selector.html();let number=parseInt(text.match(/\d+/));let change=($type=='register')?1:-1;if(text.indexOf('seats left')>=0){change*=-1;}
$selector.html(text.replace(/\d+/,String(number+change)));}
else{alert('Error1');}},error:()=>{alert('Error0');},});}});;$(function(){input_selector='input[name="truncate_num"]';input_init_val=$(input_selector).attr('value');edit_selector='.edit';edit_mode_selector='.edit_mode';cancel_selector='.cancel';max_selector='.max';save_selector='.save';event_description_selector='.event-description';read_more_selector='.read-more';function get_input_selector($this){return $this.parent().siblings(input_selector);}
function get_truncated_text($input){max=$input.attr('max');value=$input.val();$.ajax({type:'POST',url:$input.attr('data-modify-truncated-descr-url'),data:{'num':$input.val(),'csrfmiddlewaretoken':CSRF_TOKEN,},success:(response)=>{if(response){$input.parent().siblings(event_description_selector).html(response);$read_more=$input.parent().siblings(read_more_selector);alert(String(max)+String(value));if(max>value){$read_more.show();}
else{$read_more.hide();}}},error:()=>{alert('Error');},});}
$(edit_selector).on('click',function(){$(this).hide();$(this).siblings(edit_mode_selector).show();$(this).siblings(input_selector).prop('disabled',false);});$(cancel_selector).on('click',function(){$(this).parent().hide();$(this).parent().siblings(edit_selector).show();$input=get_input_selector($(this));$input.val(input_init_val).prop('disabled',true);});$(input_selector).change(function(){get_truncated_text($(this));});$(max_selector).on('click',function(){$input=get_input_selector($(this));$input.val($input.attr('max'));get_truncated_text($input);});$(save_selector).on('click',function(){$input=get_input_selector($(this));$.ajax({type:'POST',url:$(this).attr('data-modify-truncate-num-url'),data:{'num':$input.val(),'csrfmiddlewaretoken':CSRF_TOKEN,},success:(response)=>{if(response=='Success'){$(this).parent().hide();$(this).parent().siblings(edit_selector).show()
$input.prop('disabled',true);}},error:()=>{alert('Error');},});});});;