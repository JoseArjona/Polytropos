
export const FilterDom = (filterValue:String) => {
   const projectSection = document.getElementById('projects');
   const projectCards = projectSection?.querySelectorAll('article');
   projectCards?.forEach(card => {
      const tags = card.querySelectorAll('.tag');
      tags.forEach(tag => {
         if (tag.textContent === filterValue || filterValue === 'X') {
            card.classList.remove('hidden');
         } else {
            card.classList.add('hidden');
         }
      });
   } );

}