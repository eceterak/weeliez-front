export class UtilitiesService {

    public static getErrorMessage(input: any): string {
        let errorMessage = '';

        const formGroup = input._parent.controls;
        const inputName = UtilitiesService.ucfirst(Object.keys(formGroup).find(name => input === formGroup[name]) || null);

        const errorType = Object.keys(input.errors)[0];

        switch(errorType) {
            case 'required': 
            default: 
                errorMessage = inputName + ' is required.';
            break;
            case 'minlength':
                errorMessage = inputName + ' must be at least ' + input.errors.minlength.requiredLength + ' characters long.';
            break;
            case 'http':
                errorMessage = input.errors.http;
            break;   
        }

        return errorMessage;
    }

    public static ucfirst(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}