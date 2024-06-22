import { GroupContainer, FormInputContainer, FormInputLabel } from "./form-input.styles";

const FormInput = ({ label, ...otherProps } )=> {
  return (
    <GroupContainer>
       <FormInputContainer 
        {...otherProps}
      />
      { label &&
      <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>}
     
      
    </GroupContainer>

  )
}

export default FormInput;