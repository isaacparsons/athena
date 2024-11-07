// import { CreateNewsletterItemTemplateInput } from "@athena/athena-common";
// import { Stack, TextField } from "@mui/material";
// import { UseFormRegister } from "react-hook-form";

// interface EditNewsletterItemCardProps {
//     register: UseFormRegister<CreateNewsletterItemTemplateInput>;
// }
// export function EditNewsletterItemCard(props: EditNewsletterItemCardProps) {
//     const {} = props

//     if (field.data?.type === 'media') {
//         return (
//           <Stack key={field.id}>
//             <TextField
//               required
//               margin="dense"
//               label="Name"
//               type="text"
//               fullWidth
//               variant="standard"
//               {...register(`data.${index}.data.name`)}
//             />
//             <TextField
//               margin="dense"
//               label="Description"
//               type="text"
//               fullWidth
//               variant="standard"
//               {...register(`data.${index}.data.caption`)}
//             />
//           </Stack>
//         );
//       } else if (field.data?.type === 'text') {
//         return (
//           <Stack key={field.id}>
//             <TextField
//               required
//               margin="dense"
//               label="Name"
//               type="text"
//               fullWidth
//               variant="standard"
//               {...register(`data.${index}.data.name`)}
//             />
//             <TextField
//               margin="dense"
//               label="Description"
//               type="text"
//               fullWidth
//               variant="standard"
//               {...register(`data.${index}.data.description`)}
//             />
//             <TextField
//               margin="dense"
//               label="Link"
//               type="text"
//               fullWidth
//               variant="standard"
//               {...register(`data.${index}.data.link`)}
//             />
//           </Stack>
//         );
//       } else {
//         return null;
//       }
// }
