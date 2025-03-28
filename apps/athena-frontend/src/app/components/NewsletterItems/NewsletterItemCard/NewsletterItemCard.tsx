// import { Box, Typography } from '@mui/material';
// import { StoreNewsletterPost } from '@athena/store';
// import { useNavigate } from 'react-router-dom';
// import {
//   CustomCard,
//   CustomCardFooter,
//   CustomCardHeader,
//   CustomCheckbox,
//   CustomIconButton,
// } from '@athena/components';
// import { ArrowForwardIcon } from '@athena/icons';
// import { MediaFormat, NewsletterPostPostName } from '@athena/common';
// import ReactPlayer from 'react-player';

// interface NewsletterPostCardProps {
//   item: StoreNewsletterPost;
//   selectable: boolean;
//   selected: boolean;
//   onToggleSelect: (id: number) => void;
// }

// export function NewsletterPostCard({
//   item,
//   selectable,
//   selected,
//   onToggleSelect,
// }: NewsletterPostCardProps) {
//   const navigate = useNavigate();

//   const hasChildren = item.childrenIds.length > 0;

//   const handleCardClick = () =>
//     navigate(`/newsletters/${item.newsletterId}/items/${item.id}`);
//   return (
//     <CustomCard
//       onClick={selectable ? undefined : handleCardClick}
//       src={
//         item.details?.type === NewsletterPostPostName.Media &&
//         item.details.format === MediaFormat.Image
//           ? item.details.fileName
//           : undefined
//       }
//     >
//       <CustomCardHeader
//         left={
//           selectable ? (
//             <CustomCheckbox
//               id={item.id}
//               value={selected}
//               onClick={() => onToggleSelect(item.id)}
//             />
//           ) : null
//         }
//       >
//         <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography>
//       </CustomCardHeader>
//       {item.details?.type === NewsletterPostPostName.Media &&
//         item.details.format === MediaFormat.Image && <Box sx={{ height: 400 }} />}
//       {item.details?.type === NewsletterPostPostName.Media &&
//         item.details.format === MediaFormat.Video && (
//           <ReactPlayer
//             url={item.details.fileName}
//             controls={true}
//             width={'100%'}
//             height={'100%'}
//           />
//         )}
//       {item.details?.type === NewsletterPostPostName.Text && (
//         <Box sx={{ direction: 'column' }}>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//             {item.details.name}
//           </Typography>
//           {item.details.description && (
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               {item.details.description}
//             </Typography>
//           )}
//           {item.details.link && (
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               {item.details.link}
//             </Typography>
//           )}
//         </Box>
//       )}
//       <CustomCardFooter
//         right={
//           hasChildren && (
//             <CustomIconButton
//               onClick={handleCardClick}
//               icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />}
//             />
//           )
//         }
//       ></CustomCardFooter>
//     </CustomCard>
//   );
// }
