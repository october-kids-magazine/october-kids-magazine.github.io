(function () {
  const base = window.MAGAZINE.siteUrl.replace(/\/$/, '');
  window.MAGAZINE.activityDirectory = [
    { id: 'craft-work', arabic: 'أعمال يدوية ومشروعات فنية', english: 'Crafts & Art Projects', icon: 'pencil', target: '?section=classroom', qr: 'craft-work' },
    { id: 'recitation', arabic: 'الإلقاء والمشاركات الفردية', english: 'Recitation & Solo Performances', icon: 'speech', target: '?video=v01', qr: 'recitation' },
    { id: 'national-performances', arabic: 'العروض الوطنية', english: 'National Performances', icon: 'music', target: '?section=videos', qr: 'national-performances' },
    { id: 'models', arabic: 'المجسمات', english: 'Models & 3D Projects', icon: 'blocks', target: '?section=october-crafts', qr: 'models' },
    { id: 'celebration-photos', arabic: 'صور الاحتفال', english: 'Celebration Photos', icon: 'flag', target: '?section=moments', qr: 'celebration-photos' },
    { id: 'children-photos', arabic: 'صور أطفال الروضة', english: 'Kindergarten Photos', icon: 'star', target: '?section=children', qr: 'children-photos' },
    { id: 'ai-videos', arabic: 'فيديوهات بالذكاء الاصطناعي', english: 'AI-Generated Videos', icon: 'play', target: '?video=v03', qr: 'ai-videos' },
    { id: 'ai-images', arabic: 'مساحة للخيال بالذكاء الاصطناعي', english: 'AI Imagination Gallery', icon: 'dream', target: '?section=october-story', qr: 'ai-images' }
  ].map(item => ({ ...item, url: base + '/' + item.target }));
})();
