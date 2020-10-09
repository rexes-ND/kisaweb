from django import forms
from django.contrib import admin
from django.utils.html import mark_safe

from .models import Candidate, Election

# Register your models here.

class CandidateAdminForm(forms.ModelForm):
    class Meta:
        model = Candidate
        fields = '__all__'
        widgets = {
           'kisa_history': forms.Textarea(attrs={
                'placeholder': 'text',
            }),
        }


class CandidateAdmin(admin.ModelAdmin):
    form = CandidateAdminForm

    list_display = [
        'name',
        'image_tag',
        'kisa_history_template_string',
    ]

    def image_tag(self, obj):
        if not obj.image:
            path = '/static/img/candidate-default-dist.png'
        else:
            path = obj.image.url
        return mark_safe(f'<img src="{path}" alt="Candidate Image" width="150" height="150" />')

    image_tag.short_description = 'Current Image'

    def kisa_history_template_string(self, obj):
        history = obj.kisa_history.split('\n')
        return mark_safe('<br />'.join([line for line in history]))

    kisa_history_template_string.short_description = 'Kisa History'

    readonly_fields = ['image_tag']


class ElectionAdmin(admin.ModelAdmin):
    list_display = [
        '__str__',
        'candidates_list',
    ]

    def candidates_list(self, obj):
        return mark_safe('<br />'.join([c.name for c in obj.candidates.all()]))


admin.site.register(Candidate, CandidateAdmin)
admin.site.register(Election, ElectionAdmin)