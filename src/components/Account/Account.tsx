import { useFormik } from "formik"
import * as Yup from "yup"
import EditIcon from "@mui/icons-material/Edit"
import axios from "axios"
import { useState } from "react"

import Input from "../../components/Input/input"
import Button from "../../components/Button/Button"

import {
  StyledAccount,
  StyledLable,
  ButtonContainer,
  ButtonsWrapper,
} from "./styles"
import { UserUpdateRequest } from "./types"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { signInSelectors } from "../../store/redux/SignInFormSlice/SignInFormSlice"
import { alertActions } from "../../store/redux/AlertSlice/AlertSlice"
import { InputTypes } from "../../components/Input/types"
import { AlertSliceState } from "../../store/redux/AlertSlice/types"
import { User } from "../../store/redux/SignInFormSlice/types"

function Account() {
  const dispatch = useAppDispatch()
  const [isInputDisabled, setInputDisabled] = useState(true)
  const [isSendButtonDisabled, setSendButtonDisabled] = useState(true)
  const [isEditButtonDisabled, setEditButtonDisabled] = useState(false)

  const user: User = useAppSelector(signInSelectors.user)

  let userInitialData: UserUpdateRequest = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  }

  const onEditButton = () => {
    setInputDisabled(false)
    setSendButtonDisabled(false)
    setEditButtonDisabled(true)
    console.log(isInputDisabled)
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname could not be empty"),
    lastName: Yup.string().required("Lastname could not be empty"),
    email: Yup.string()
      .email("Data should be in email format")
      .required("Firstname could not be empty"),
  })

  const formik = useFormik<UserUpdateRequest>({
    initialValues: userInitialData,

    validationSchema: validationSchema,
    validateOnChange: false,

    onSubmit: async values => {
      try {
        const response = await axios.put(
          "/api/users/update",
          {
            userId: values.userId,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber,
          },
          {
            headers: {
              "Content-Type": "application/JSON",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        let alertSate: AlertSliceState = {
          isOpen: true,
          severity: "info",
          children: response.data.message,
        }
        dispatch(alertActions.setAlertStateOpen(alertSate))

        setInputDisabled(true)
        setSendButtonDisabled(true)
        setEditButtonDisabled(false)
        getNewValues()
      } catch (e: any) {
        const error = e.response.data
        let alertSate: AlertSliceState = {
          isOpen: true,
          severity: "error",
          children: error.errorMessage,
        }
        dispatch(alertActions.setAlertStateOpen(alertSate))
      }
    },
  })

  const getNewValues = () => {
    formik.values.userId = useAppSelector(signInSelectors.user).id
    formik.values.firstName = useAppSelector(signInSelectors.user).firstName
    formik.values.lastName = useAppSelector(signInSelectors.user).lastName
    formik.values.phoneNumber = useAppSelector(signInSelectors.user).phoneNumber
    formik.values.email = useAppSelector(signInSelectors.user).email
  }

  return (
    <>
      <StyledAccount onSubmit={formik.handleSubmit}>
        <StyledLable>My Account</StyledLable>
        <Input
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          disabled={isInputDisabled}
        />
        <Input
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          disabled={isInputDisabled}
        />
        <Input
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          disabled={isInputDisabled}
        />
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          //Input is disabled because it leads to Authentication Error
          disabled
          type={InputTypes.EMAIL}
        />
        <ButtonsWrapper>
          <ButtonContainer>
            <Button
              type="button"
              onClick={onEditButton}
              disabled={isEditButtonDisabled}
            >
              <EditIcon />
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button isRegularButton disabled={isSendButtonDisabled}>
              Send
            </Button>
          </ButtonContainer>
        </ButtonsWrapper>
      </StyledAccount>
    </>
  )
}

export default Account
