import React, {FC} from "react";
import {useForm} from "react-hook-form";
import {getName} from "../../utils/forms/getName";
import {useTypesSelector} from "../../../app/hooks";
import {putProfileObject, toggleEditMode} from "../../../redax/profileReducer";
import {Box, Button, FormControl, InputLabel, NativeSelect, styled, TextField} from '@mui/material';
import {IErrorType, ISetUserProfile} from "../../../types/types";
import {useAppDispatch} from "../../../app/redax-store";

let FormTag = styled("form")(({theme}) => ({
   p: 1,
   border: "1px solid theme.palette.text.secondary",
   [theme.breakpoints.up('md')]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridAutoRows: "auto",
      gap: 10,
      //alignItems: "center"
   },
}))
let addErrors = (errArr: string[], callBack: (...args: any[]) => void): void => {
   const errors: IErrorType[] = []
   errArr.forEach((item) => {
      errors.push({type: "manual", name: getName(item), message: item.split("(")[0]})
   })
   errors.forEach(({name, type, message}) =>
      callBack(name, {type, message})
   );
}

export let AboutForm: FC = () => {
   const {register, setError, handleSubmit, formState: {errors}} = useForm();
   let dispatch = useAppDispatch()

   let isDisabled = useTypesSelector(state => state.profilePage.submitButtonDisabled)
   let id = useTypesSelector(state => state.auth.userId)
   let userProfile = useTypesSelector(state => state.profilePage.userProfile)

   let aboutSubmit = async (data: ISetUserProfile) => {
      if (typeof id !== "number") return
      let response = await dispatch(putProfileObject(data))
      if (putProfileObject.rejected.match(response)) {
         const arrOfErrors = response.payload?.messages
         if (arrOfErrors) {
            addErrors([], setError)
         }
      }
   }
   return (
      <Box sx={{
         bgcolor: "#bab0b0",
         width: "100%",
         boxShadow: 1,
         mt: 1,
         padding: (theme) => theme.spacing(1),
         pt: 2,
         textAlign: "end"
      }}>
         <FormTag onSubmit={handleSubmit(aboutSubmit)}>
            <FormControl fullWidth>
               <InputLabel variant="standard" htmlFor="lookingForAJob">
                  Looking for a job
               </InputLabel>
               <NativeSelect
                  {...register("lookingForAJob", {
                     deps: ['lookingForAJobDescription'],
                  })}
                  defaultValue={!!userProfile?.lookingForAJob}
                  inputProps={{
                     name: 'lookingForAJob',
                     id: 'lookingForAJob',
                  }}
               >
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No</option>
               </NativeSelect>
            </FormControl>

            <TextField
               {...register("lookingForAJobDescription", {
                  required: true
               })}
               error={errors.lookingForAJobDescription}
               defaultValue={userProfile?.lookingForAJobDescription || undefined}
               helperText={errors.lookingForAJobDescription && errors.lookingForAJobDescription.message}
               fullWidth
               label="Description of the job I'm looking for"
            />

            <TextField
               {...register("fullName")}
               error={errors.fullName}
               helperText={errors.fullName && errors.fullName.message}
               defaultValue={userProfile?.fullName || undefined}
               fullWidth
               label="My fullname"
            />

            <TextField
               {...register("aboutMe")}
               error={errors.aboutMe}
               helperText={errors.aboutMe && errors.aboutMe.message}
               defaultValue={userProfile?.aboutMe || undefined}
               fullWidth
               label="About me"
            />

            <TextField
               {...register("contacts.facebook")}
               error={errors.contacts?.facebook}
               helperText={errors.contacts?.facebook && errors.contacts?.facebook.message}
               defaultValue={userProfile?.contacts.facebook || undefined}
               fullWidth
               label="My profile in facebook"
            />
            {errors.facebook && <p>{errors.facebook.message}</p>}

            <TextField
               {...register("contacts.github")}
               error={errors.contacts?.github}
               helperText={errors.contacts?.github && errors.contacts?.github.message}
               defaultValue={userProfile?.contacts.github || undefined}
               fullWidth
               label="My profile in github"
            />

            <TextField
               {...register("contacts.instagram")}
               error={errors.contacts?.instagram}
               helperText={errors.contacts?.instagram && errors.contacts?.instagram.message}
               defaultValue={userProfile?.contacts.instagram || undefined}
               fullWidth
               label="My profile in instagram"
            />

            <TextField
               {...register("contacts.mainLink")}
               error={errors.contacts?.mainLink}
               helperText={errors.contacts?.mainLink && errors.contacts?.mainLink.message}
               defaultValue={userProfile?.contacts.mainLink || undefined}
               fullWidth
               label="My profile in mainLink"/>

            <TextField
               {...register("contacts.twitter")}
               error={errors.contacts?.twitter}
               helperText={errors.contacts?.twitter && errors.contacts?.twitter.message}
               defaultValue={userProfile?.contacts.twitter || undefined}
               fullWidth
               label="My profile in twitter"/>

            <TextField
               {...register("contacts.vk")}
               error={errors.contacts?.vk}
               helperText={errors.contacts?.vk && errors.contacts?.vk.message}
               defaultValue={userProfile?.contacts.vk || undefined}
               fullWidth
               label="My profile in vk"/>

            <TextField
               {...register("contacts.website")}
               error={errors.contacts?.website}
               helperText={errors.contacts?.website && errors.contacts?.website.message}
               defaultValue={userProfile?.contacts.website || undefined}
               fullWidth
               label="My website"/>

            <TextField
               {...register("contacts.youtube")}
               error={errors.contacts?.youtube}
               helperText={errors.contacts?.youtube && errors.contacts?.youtube.message}
               defaultValue={userProfile?.contacts.youtube || undefined}
               fullWidth
               label="My channel in youtube"/>
            <Button variant="outlined" type={"submit"} disabled={isDisabled}>Submit</Button>
            <Button
               onClick={() => dispatch(toggleEditMode())}
               variant="outlined"
               type={"submit"}
               disabled={isDisabled}>i don`t want to edit
            </Button>
         </FormTag>
      </Box>
   )
}
