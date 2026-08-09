export const products = [
  {
    id: 'pore-cleanser',
    slug: 'advanced-pore-cleanser',
    name: 'أداة تنظيف المسام الاحترافية',
    nameEn: 'Advanced Pore Cleanser',
    price: 225,
    exitPrice: 199,
    oldPrice: 350,
    discount: 36,
    currency: 'د.م',
    shortDescription: 'تنظيف عميق للمسام وإزالة الرؤوس السوداء بتقنية الشفط الآمن',
    description: 'أداة كهربائية لتنظيف المسام وإزالة الرؤوس السوداء بتقنية الشفط الآمن، مصممة خصيصاً للاستعمال اليومي في المنزل. تشفط الأوساخ والزيوت الزائدة من عمق المسام دون أن تؤذي البشرة، وتعطيك نتيجة واضحة من أول استعمال.',
    problem: 'المسام المسدودة والرؤوس السوداء التي تبقى ظاهرة حتى بعد الغسيل العادي، وتؤثر على الثقة بالنفس خصوصاً في الصور القريبة.',
    target: 'نساء ورجال 18-40 سنة، بشرة دهنية أو مختلطة، كل من لديه مشكلة الرؤوس السوداء أو المسام الواسعة.',
    usage: 'بعد غسل الوجه بالماء الدافئ لفتح المسام، اختر الرأس والمستوى المناسب، ومرر الأداة بحركات دائرية بطيئة على المنطقة المطلوبة لمدة 3-5 ثوانٍ لكل نقطة.',
    boxContents: 'الأداة الرئيسية + 5 رؤوس قابلة للتبديل + كابل شحن USB + دليل الاستعمال',
    featured: true,
    category: 'تنظيف المسام',
    rating: 4.9,
    reviews: 127,
    images: {
      hero: '/media/products/pore-cleanser/hero.jpeg',
      gallery: [
        '/media/products/pore-cleanser/gallery-1.jpeg',
        '/media/products/pore-cleanser/gallery-2.jpeg',
        '/media/products/pore-cleanser/gallery-3.jpeg',
        '/media/products/pore-cleanser/gallery-4.jpeg',
      ],
    },
    features: [
      'تقنية شفط قوي وآمن لإزالة الرؤوس السوداء والشوائب',
      '5 رؤوس قابلة للتبديل تناسب جميع مناطق الوجه',
      '3-5 مستويات شفط قابلة للتعديل حسب حساسية البشرة',
      'بطارية قابلة للشحن عبر USB — تدوم طويلاً',
      'خفيفة ومريحة في اليد، سهلة الاستعمال',
    ],
    benefits: [
      {
        title: 'تنظيف عميق',
        description: 'تشفط الأوساخ والزيوت من عمق المسام بلا أذى للبشرة',
      },
      {
        title: '5 رؤوس متعددة',
        description: 'رؤوس مختلفة للأنف والجبهة والذقن والمناطق الحساسة',
      },
      {
        title: 'مستويات شفط',
        description: 'من 3 إلى 5 مستويات قابلة للتعديل حسب نوع بشرتك',
      },
      {
        title: 'شحن USB سهل',
        description: 'بطارية تدوم طويلاً وتشحن عبر أي كابل USB',
      },
    ],
  },

  {
    id: 'silicone-brush',
    slug: 'silicone-cleansing-brush',
    name: 'فرشاة تنظيف الوجه بالسيليكون القابلة للشحن',
    nameEn: 'Silicone Cleansing Brush',
    price: 192,
    exitPrice: 179,
    oldPrice: 299,
    discount: 36,
    currency: 'د.م',
    shortDescription: 'تنظيف عميق ولطيف بتقنية الاهتزاز — مقاومة للماء وقابلة للشحن',
    description: 'فرشاة كهربائية بالسيليكون الطبي الناعم، مصممة لتنظيف عميق للوجه بتقنية الاهتزاز اللطيف. تزيل بقايا المكياج والأوساخ وخلايا الجلد الميتة التي لا تستطيع إزالتها اليد وحدها، وفي نفس الوقت تدلك البشرة وتحسن الدورة الدموية.',
    problem: 'التنظيف اليدوي بالصابون وحده لا يزيل سوى جزء من الأوساخ والمكياج، والباقي يبقى في المسام ويسبب حبوباً وبشرة باهتة مع الوقت.',
    target: 'جميع أنواع البشرة (حساسة، عادية، دهنية) — نساء ورجال يريدون روتيناً يومياً فعالاً لتنظيف الوجه.',
    usage: 'بلل وجهك، ضع قليلاً من غسول البشرة على الفرشاة، شغلها وحرك بحركات دائرية لطيفة لمدة دقيقة على كل منطقة من الوجه، ثم اشطف بالماء.',
    boxContents: 'الفرشاة + كابل شحن USB + دليل الاستعمال',
    featured: true,
    category: 'تنظيف الوجه',
    rating: 4.8,
    reviews: 214,
    images: {
      hero: '/media/products/silicone-brush/hero.jpeg',
      gallery: [
        '/media/products/silicone-brush/gallery-1.jpeg',
        '/media/products/silicone-brush/gallery-2.jpeg',
        '/media/products/silicone-brush/gallery-3.jpeg',
        '/media/products/silicone-brush/gallery-3.jpeg',
      ],
    },
    features: [
      'تنظيف عميق بتقنية الاهتزاز الصوتي اللطيف',
      'سيليكون طبي 100% — لطيف على البشرة ومضاد للبكتيريا',
      'مقاومة للماء بالكامل — تستعملها في الدوش',
      'بطارية قابلة للشحن عبر USB — شحنة واحدة تدوم أسابيع',
      'سهلة التنظيف والتعقيم بعد الاستعمال',
    ],
    benefits: [
      {
        title: 'تنظيف عميق',
        description: 'تقنية الاهتزاز الصوتي تزيل الأوساخ والمكياج بعمق',
      },
      {
        title: 'مقاومة للماء',
        description: 'آمنة 100% للاستعمال في الحمام والدوش',
      },
      {
        title: 'سيليكون طبي',
        description: 'لطيف على البشرة الحساسة ومضاد للبكتيريا',
      },
      {
        title: 'لجميع أنواع البشرة',
        description: 'مناسبة للبشرة الحساسة والدهنية والعادية',
      },
    ],
  },

  {
    id: 'ems-device',
    slug: 'ems-face-lifting-device',
    name: 'جهاز تدليك الوجه EMS مع سيروم التغذية والتفتيح',
    nameEn: 'EMS Face Lifting Device + Serum',
    price: 245,
    exitPrice: 219,
    oldPrice: 399,
    discount: 38,
    currency: 'د.م',
    shortDescription: 'شد البشرة وإشراقها بتقنية EMS + سيروم فيتامينات — نتائج في 28 يوماً',
    description: 'باك كامل يجمع بين جهاز تدليك كهربائي بتقنية EMS (تحفيز عضلات الوجه بالتيار المنخفض) وسيروم مغذٍّ غني بالفيتامينات. الجهاز يحفز عضلات الوجه ويحسن الدورة الدموية، والسيروم يغذي البشرة بعمق — النتيجة بشرة أكثر شداً وإشراقاً خلال 28 يوماً من الاستعمال المنتظم.',
    problem: 'البشرة المتعبة والمترهلة مع التقدم في العمر أو قلة النوم والضغط اليومي، وصعوبة الحصول على علاجات تجميل احترافية بثمن معقول.',
    target: 'نساء 25 سنة فما فوق، مهتمات بروتين العناية المتقدم، خصوصاً من يبحثن عن بديل منزلي لعلاجات التجميل المكلفة.',
    usage: 'ضع كمية صغيرة من السيروم على الوجه، شغل الجهاز واختر الشدة المناسبة، ومرر الرأس المعدني بحركات صاعدة من أسفل الوجه نحو الأعلى لمدة 5 دقائق يومياً.',
    boxContents: 'الجهاز الكهربائي + قنينة السيروم 40 مل + كابل شحن + دليل الاستعمال',
    featured: true,
    category: 'شد البشرة',
    rating: 4.9,
    reviews: 189,
    images: {
      hero: '/media/products/ems-device/hero.jpeg',
      gallery: [
        '/media/products/ems-device/gallery-1.jpeg',
        '/media/products/ems-device/gallery-2.jpeg',
        '/media/products/ems-device/gallery-3.jpeg',
        '/media/products/ems-device/gallery-3.jpeg',
      ],
    },
    features: [
      'تقنية EMS لتحفيز عضلات الوجه وشد البشرة بشكل طبيعي',
      'سيروم مرفق غني بفيتامين E وC للتغذية والتفتيح',
      'نتائج ملحوظة خلال 28 يوماً من الاستعمال المنتظم',
      'روتين سريع وسهل: 5 دقائق يومياً فقط',
      'تصميم أنيق بلون ذهبي — سهل الإمساك والاستعمال',
    ],
    benefits: [
      {
        title: 'شد البشرة',
        description: 'تقنية EMS تحفز عضلات الوجه لشد طبيعي وفعال',
      },
      {
        title: 'نتائج في 28 يوماً',
        description: 'تحسن ملحوظ مع الاستعمال المنتظم يومياً',
      },
      {
        title: 'سيروم فيتامينات مرفق',
        description: 'سيروم 40 مل غني بفيتامين E وC للتغذية والإشراق',
      },
      {
        title: '5 دقائق فقط يومياً',
        description: 'روتين سريع يناسب أي جدول مشغول',
      },
    ],
  },
];

export const getProductBySlug = (slug) => {
  return products.find((p) => p.slug === slug);
};

export const getFeaturedProducts = () => {
  return products.filter((p) => p.featured);
};

export const getProductsByCategory = (category) => {
  return products.filter((p) => p.category === category);
};

export const moroccanCities = [
  'الدار البيضاء',
  'الرباط',
  'مراكش',
  'طنجة',
  'فاس',
  'أكادير',
  'مكناس',
  'وجدة',
  'القنيطرة',
  'تطوان',
  'سلا',
  'الجديدة',
  'بني ملال',
  'الناظور',
  'آسفي',
  'خريبكة',
  'أخرى',
];
