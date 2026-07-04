// export const queries = {
//   allArticles: `
//     *[_type == "article"] | order(publishedAt desc) {
//       _id,
//       title,
//       "slug": slug.current,
//       publishedAt,
//       coverImage,
//       "category": category->name
//     }
//   `,

//   allCategories: `
//     *[_type == "category"] {
//       _id,
//       name
//     }
//   `,

//   articleBySlug: `
//     *[_type == "article" && slug.current == $slug][0] {
//       _id,
//       title,
//       content,
//       publishedAt,
//       coverImage,
//       "category": category->name
//     }
//   `,
// };