(function () {
  const C = window.MAGAZINE, base = C.siteUrl.replace(/\/$/, '');
  // Mixed creative pages keep their established media; only verified items enter AI-only galleries.
  const creative=C.sections.find(s=>s.id==='creative');
  if(creative)Object.assign(creative,{arabic:'إبداعات أطفالنا',english:'Children’s Creative Moments'});
  const definitions = [
    ['story', 'رواية القصة', 'Storytelling', 'book', 'october-story'],
    ['children-photos', 'صور الأطفال', 'Children’s Photos', 'star', 'children'],
    ['celebration-photos', 'صور العروض', 'Performance Photos', 'stage', 'moments'],
    ['craft-work', 'الرسم الحر والنشاطات', 'Free Drawing & Activities', 'pencil', 'classroom'],
    ['models', 'مجسمات أكتوبر بخامات البيئة', 'October Models with Environmental Materials', 'blocks', 'october-crafts'],
    ['recitation', 'فيديوهات الإلقاء', 'Recitation Videos', 'speech', null, ['v01','v05','v21']],
    ['national-performances', 'فيديوهات العروض والأغاني الوطنية', 'Performance & National Songs Videos', 'music', null, ['v02','v04','v08','v09','v13','v14','v18','v19','v20','last']],
    ['ai-images', 'صور بالذكاء الاصطناعي', 'AI-Generated Images', 'dream', null, ['october-ai','story-teamwork','story-peace']],
    ['ai-videos', 'فيديوهات بالذكاء الاصطناعي', 'AI-Generated Videos', 'play', null, ['v03']]
  ];
  C.activityDirectory = definitions.map(([id, arabic, english, icon, section, ids]) => {
    const target = section ? '?section=' + section : '?category=' + id;
    return {id, arabic, english, icon, section, ids, target, qr:id, url:base+'/'+target};
  });
  for (const item of C.activityDirectory) {
    const section = C.sections.find(s => s.id === item.section);
    if (section) Object.assign(section, {arabic:item.arabic, english:item.english});
  }
})();
