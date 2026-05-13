import { NextRequest } from "next/server";

function randScore(): number {
  // Random float between 7.5 and 10.0, one decimal
  return Math.round((Math.random() * 2.5 + 7.5) * 10) / 10;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Sample pools ─────────────────────────────────────────────────────────────

const SYMMETRY_DESC = [
  "Your facial symmetry is remarkably balanced — both sides mirror each other with impressive precision, a hallmark of high aesthetic appeal.",
  "Excellent bilateral symmetry detected across the eye, brow, and lip axes, giving your face a naturally harmonious and pleasing appearance.",
  "Strong symmetry is evident in your feature alignment; the midline is straight and consistent, which contributes significantly to your overall attractiveness.",
  "Your face displays near-perfect left-right balance, with only the most subtle natural asymmetry that adds character rather than detracting.",
  "The symmetry ratio here is well above average — your brows, eyes, and mouth corners align with impressive geometric consistency.",
  "Bilateral harmony is one of your standout traits; the soft mirroring of your features creates a deeply pleasing visual cohesion.",
  "Your symmetry scores in the top percentile — feature pairs align naturally without any dominant imbalance, creating effortless aesthetic harmony.",
  "Both facial halves are exceptionally well-matched, lending your face the kind of balanced beauty that photographs beautifully from any angle.",
  "Natural, well-proportioned symmetry characterizes your face — a slight asymmetry on the left side is barely perceptible and adds uniqueness.",
  "Your facial balance is excellent; from brow arch to lip corners, the two halves work in seamless agreement.",
];

const FACIAL_THIRDS_DESC = [
  "Your facial thirds are proportionally balanced — forehead, midface, and lower face each occupy roughly equal vertical space, which is the golden standard.",
  "The upper, middle, and lower thirds of your face are in near-perfect harmony, reflecting classical proportion principles with impressive accuracy.",
  "Excellent third distribution: your forehead length complements your midface beautifully, and your lower third has ideal depth for strong feature definition.",
  "Your proportions follow the golden ratio closely — midface length and lower third depth align to create a naturally structured, aesthetic face.",
  "The three facial zones are balanced in a way that gives your face a composed, camera-ready quality that most people aspire to.",
  "Forehead-to-brow, brow-to-nose, and nose-to-chin ratios are all within ideal range, giving your face excellent classical proportionality.",
  "Strong facial thirds balance detected — your lower third has ideal length, preventing any appearance of being top-heavy or bottom-heavy.",
  "Your vertical facial proportions are textbook — the midface is the anchor that keeps the upper and lower regions in elegant equilibrium.",
  "The equal distribution across your three facial zones is a clear aesthetic strength; it gives your face a mature, refined structure.",
  "Your facial thirds reveal a carefully proportioned canvas — each zone transitions seamlessly into the next with no jarring imbalance.",
];

const EYE_AREA_DESC = [
  "Your eyes are bright, well-spaced, and carry an expressive depth that immediately draws attention — a genuine standout feature.",
  "The eye area exhibits excellent horizontal spacing and a beautiful almond shape, both of which are classic markers of high visual appeal.",
  "Your brow arch complements the eye shape perfectly, creating a strong, expressive upper-face frame that elevates your entire look.",
  "Eyes are ideally set apart — neither too close nor too wide — and their shape has a natural lift at the outer corners that reads as youthful.",
  "The combination of your eye shape, size, and brow positioning creates an upper-face region that is both striking and harmonious.",
  "Deep-set eyes with strong brow support give your face an intense, defined quality that photographs with exceptional character.",
  "Your eye area is one of your most powerful features — the symmetry between brows and lashes creates a beautifully framed focal point.",
  "Wide, expressive eyes with clean lash lines and well-arched brows — this combination is a textbook example of an attractive eye region.",
  "The horizontal eye width-to-face-width ratio is nearly ideal here, lending your face a proportionate and visually engaging appearance.",
  "Your eyes communicate warmth and depth, backed by a clean brow structure that keeps the upper third looking crisp and well-defined.",
];

const NOSE_HARMONY_DESC = [
  "Your nose harmonizes beautifully with the rest of your face — the bridge is straight, the tip is refined, and the nostrils are proportionate.",
  "Excellent nose-to-face-width ratio; your nose anchors the midface without overpowering it, which is a key aesthetic balance point.",
  "The bridge and tip definition on your nose are excellent — clean lines that provide midface structure without disrupting overall harmony.",
  "Your nose has a natural elegance — a smooth bridge, softly defined tip, and nostrils that sit in perfect proportion to the midface.",
  "Nose proportions are within ideal range: width aligns with the inner corners of the eyes, and tip projection is balanced and refined.",
  "The overall nose shape complements your face shape seamlessly — it's a feature that enhances rather than competes with the other elements.",
  "A well-proportioned nose with ideal tip definition and a straight bridge that transitions naturally from brow to lip region.",
  "Your nasal structure provides excellent midface support — the subtle slope and refined tip add elegance without being a dominant element.",
  "Nose width is exactly on-point relative to your facial width, and the septum line is clean and well-centered.",
  "Your nose contributes beautifully to the overall midface composition — neither too prominent nor recessed, it sits in perfect aesthetic balance.",
];

const LIP_DESC = [
  "Your lips have a well-defined cupid's bow and a lower lip that balances the upper with ideal fullness — a very attractive combination.",
  "Lip proportions are in the classic 1:1.6 upper-to-lower ratio range, which is widely regarded as one of the most aesthetically pleasing lip shapes.",
  "Full, symmetrically shaped lips with a pronounced cupid's bow — this is a feature that adds significant visual warmth to your face.",
  "Your lips carry a natural pout with clean definition at the vermillion border, giving your lower face an expressive, attractive quality.",
  "The width of your lips aligns well with the inner iris distance, creating a proportion that reads as naturally balanced on camera.",
  "Beautifully shaped lips with a defined philtrum column above — the relationship between your nose base and lip is perfectly harmonious.",
  "Your lip shape has excellent symmetry and the corners turn very slightly upward, giving your face an approachable and warm baseline expression.",
  "The upper lip fullness is excellent, and the lower lip provides just the right amount of volume to create a naturally balanced, attractive mouth.",
  "Clean lip line with a distinctly shaped cupid's bow and proportional corners — your lip area is a genuine aesthetic strength.",
  "Your lip proportions are naturally photogenic — the soft fullness and symmetrical shape photograph well from all angles.",
];

const JAWLINE_DESC = [
  "Your jawline is sharp, well-defined, and follows a strong angular path — this level of jaw structure is a hallmark of high facial attractiveness.",
  "Excellent jaw definition with a clean mandibular line that transitions elegantly from ear to chin, creating a strong and structured lower face.",
  "The jawline has a confident, well-chiseled quality — the angle is sharp without being harsh, and the line is smooth and uninterrupted.",
  "A naturally defined jaw with great structural clarity; the jaw angles are prominent in exactly the right way for a masculine/feminine balance.",
  "Your jaw structure provides an ideal foundation for the lower face — clean, angular, and proportionate to your cheekbone width.",
  "Strong mandibular definition creates a striking silhouette — your jawline is one of the most visually impactful features of your face.",
  "The jaw follows an ideal arc from chin point to ear — the smooth, defined line gives your profile exceptional aesthetic quality.",
  "Your jawline combines structural strength with elegant proportionality — a well-defined but not overdominant jaw that frames the face beautifully.",
  "Jaw definition is well above average here — the bone structure creates natural shadow and dimension that photographs with impressive depth.",
  "A refined, clearly visible jawline with excellent edge definition — this is the kind of bone structure that significantly elevates overall facial scoring.",
];

const CHIN_DESC = [
  "Your chin has excellent projection and width — it anchors the lower face with just the right amount of prominence to balance the upper face.",
  "A well-proportioned chin with ideal forward projection; it prevents any appearance of facial recess and provides strong profile definition.",
  "The chin shape is classically proportioned — centered, slightly rounded, and in perfect vertical balance with the nose and forehead.",
  "Chin projection and width are in ideal range — your lower face has a complete, finished quality thanks to this well-positioned anchor point.",
  "Your chin provides excellent lower-face structure — it's neither too prominent nor too soft, sitting in perfect harmony with your jawline.",
  "A strong, well-centered chin with clean definition at the base — this gives your face a confident and aesthetically complete silhouette.",
  "The chin point aligns well with the nasion and lip line — your lower face has ideal vertical depth and projection.",
  "Your chin contributes to a balanced lower-third — the width is proportionate to the mouth, and projection provides clean profile depth.",
  "An attractively shaped chin with natural definition and ideal positioning relative to the lip and jaw structure.",
  "Chin width and projection create a lower face that feels grounded and complete — a structural asset that elevates your overall profile score.",
];

const CHEEKBONE_DESC = [
  "High, well-projected cheekbones give your face a naturally sculpted quality that creates beautiful shadow and dimension.",
  "Your cheekbone structure is exceptional — prominent without being sharp, they cast natural light and shadow that enhance your overall look.",
  "The cheekbone projection here is clearly above average — it creates a mid-face architecture that is both striking and photogenic.",
  "Excellent lateral cheekbone prominence that gives your face a sculpted, defined midface — one of the most coveted facial structural traits.",
  "Your cheekbones sit at an ideal height and projection, creating the natural contouring that photographers and aestheticians prize highly.",
  "Strong malar prominence provides excellent midface support and creates the kind of natural highlighting that flatters in any lighting.",
  "Cheekbone structure is a clear standout here — the lateral projection creates a striking midface silhouette that enhances overall beauty.",
  "Your cheekbones are well-positioned and prominent enough to create natural dimension without overbalancing the midface.",
  "The zygomatic arch is clearly defined and well-placed — your cheekbones give your face a strong, model-like structural foundation.",
  "Well-projected cheekbones that frame the eye area beautifully from below, creating the coveted high-cheekbone aesthetic.",
];

const SKIN_DESC = [
  "Your skin appears clear, even-toned, and well-hydrated — the texture reads as smooth and healthy, which adds a radiant quality to the face.",
  "Excellent skin clarity visible even through the photo — minimal blemishes, consistent tone, and a luminous finish that elevates the overall look.",
  "Skin texture appears smooth and refined; the even tone across the face contributes significantly to your high overall aesthetic score.",
  "A healthy, glowing complexion is evident — your skin tone is consistent and the surface texture appears clean and well-maintained.",
  "Your skin has an enviable quality in this image — the pore size is minimal and the tone is beautifully uniform, lending a polished appearance.",
  "Clear, well-maintained skin with excellent tone consistency — this is the kind of complexion that enhances every other facial feature around it.",
  "Skin texture appears very healthy and even; there's a natural radiance that suggests good skin care and healthy habits.",
  "Your complexion is a genuine asset — the clarity and evenness of tone give your face a fresh, vibrant quality that enhances overall attractiveness.",
  "Skin appears smooth and healthy with good hydration markers; the lack of visible texture issues elevates the entire face's presentation.",
  "Clean, luminous skin tone that complements your bone structure beautifully — a well-maintained complexion that adds polish to every feature.",
];

const HAIRLINE_DESC = [
  "Your hairline is clean, well-shaped, and frames the forehead beautifully — the natural arc complements your facial proportions perfectly.",
  "An ideal hairline shape that creates a well-defined upper-face boundary, enhancing the perceived balance of your facial thirds.",
  "Hairline density appears excellent and the shape frames the face with a natural elegance — a very aesthetically pleasing hairline profile.",
  "Your hairline sits at an ideal height and follows a clean, symmetrical arc that integrates naturally with your facial structure.",
  "The hairline provides a clean upper frame for the face — its shape and density contribute to a polished, well-composed overall appearance.",
  "Excellent hairline definition — it creates a strong visual boundary between face and hair that frames your features with precision.",
  "A naturally high-density hairline with a classic shape that perfectly proportions your forehead to the rest of the face.",
  "Your hairstyle and hairline work in harmony — the choice of style complements your facial shape and enhances structural features.",
  "Clean, well-maintained hairline with good density and a symmetrical arc — it frames the forehead in a way that balances the lower face.",
  "Hairline shape and density are excellent assets — the natural framing effect enhances the overall composition of your facial aesthetics.",
];

const GROOMING_DESC = [
  "Your grooming is impeccable — well-shaped brows, clean skin presentation, and a polished overall appearance that elevates every feature.",
  "Excellent grooming evident throughout: clean brow lines, well-maintained facial hair (if any), and a presentation that looks effortlessly sharp.",
  "Your brows are perfectly shaped and well-groomed — they frame the eyes with precision and add definition to the upper face.",
  "Grooming is clearly a priority for you — the overall presentation is clean, intentional, and enhances your natural features beautifully.",
  "Well-groomed appearance with clean lines and a polished finish — this level of upkeep significantly amplifies your natural aesthetic score.",
  "Your presentation is sharp and well-maintained — grooming choices are clearly working in your favor and enhancing your natural features.",
  "Immaculate grooming with well-defined brows and clean skin presentation — the overall polish adds a premium quality to your appearance.",
  "Your grooming standard is high — everything from brow architecture to overall skin presentation reads as intentional and well-executed.",
  "Clean, confident grooming that frames your features effectively — well-shaped brows and polished presentation are clear aesthetic assets.",
  "Excellent grooming throughout — the attention to detail in your presentation amplifies your bone structure and natural feature quality.",
];

const HARMONY_DESC = [
  "Every feature on your face works in concert — the overall harmony creates a sum that is genuinely greater than its individual parts.",
  "Exceptional overall harmony: no single feature dominates or clashes, creating a cohesive, beautifully balanced face that reads as highly attractive.",
  "Your facial features are in beautiful agreement — the harmony between all elements creates a naturally pleasing and well-integrated aesthetic.",
  "Overall facial harmony is one of your biggest strengths — the way your features complement each other elevates your attractiveness significantly.",
  "A remarkable sense of cohesion across all features — eyes, nose, lips, and jaw all work in seamless aesthetic agreement.",
  "The gestalt of your face is excellent — individual features are strong, but it's the way they integrate together that makes the biggest impact.",
  "Exceptional harmony detected across all 12 metrics — your face has a rare quality where every element enhances the ones around it.",
  "Your face achieves a high level of overall aesthetic unity — the proportions, symmetry, and feature quality all reinforce each other.",
  "Every facial zone reads as part of a coherent whole — this kind of integrated harmony is what makes a face genuinely striking.",
  "Overall facial harmony here is truly impressive — the balance between strong features and soft transitions creates an aesthetically complete face.",
];

const PHOTOGENIC_DESC = [
  "Your face has exceptional camera affinity — the combination of strong bone structure and balanced proportions means you photograph beautifully.",
  "Highly photogenic: your facial planes catch light naturally and your features have the kind of definition that cameras love.",
  "Your face translates excellently to photography — the symmetry and proportions that work in person are amplified on camera.",
  "Strong photogenic potential driven by your cheekbone structure and eye expressiveness — you likely look great from multiple angles.",
  "The light-catching quality of your facial structure is excellent — prominent features and good skin tone combine for high photo appeal.",
  "Your face has a natural photogeneity — the proportions are ideal for 2D capture and your features retain their impact through a lens.",
  "Camera-ready features throughout — your facial geometry is naturally optimized for photography in both natural and studio lighting.",
  "Exceptional photogenic potential — your bone structure, symmetry, and feature definition create a face that performs above expectations on camera.",
  "Your face photographs with a striking quality — strong features, clear proportions, and excellent skin tone all contribute to high photogenic potential.",
  "Very high photogenic score driven by the combination of structural strength and feature harmony — this face is made for the camera.",
];

const SUMMARY_POOL = [
  "Your facial analysis reveals a strikingly well-composed face with excellent structural proportions and strong feature harmony. The combination of defined bone structure, expressive eyes, and balanced thirds places you well above the average aesthetic benchmark. This is a face that commands attention effortlessly and photographs with remarkable quality.",
  "The results here are genuinely impressive — your facial structure exhibits the kind of balanced, high-quality proportions that aesthetic analysts associate with exceptional attractiveness. Your standout bone structure and feature symmetry create a cohesive, highly appealing face that is both striking in person and photogenic on camera.",
  "A beautifully structured face with excellent proportionality across all measured dimensions. Your cheekbone projection, jaw definition, and eye area work in concert to create a face that reads as naturally attractive from every angle. The overall harmony of your features is one of the most compelling aspects of your facial aesthetic.",
  "Your facial aesthetics score reflects a combination of strong structural fundamentals and refined feature quality. The proportions across your facial thirds are exceptionally balanced, and your individual features all contribute positively to the overall composition. This is a face with genuine, high-caliber attractiveness that stands out across every measured metric.",
  "An outstanding facial profile with multiple elite-tier features working in harmony. Your symmetry, bone structure, and feature proportions all read as well above average, creating a face that is both classically attractive and distinctly memorable. The overall aesthetic cohesion here is genuinely rare and reflects a very high attractiveness ceiling.",
  "Your face presents a compelling aesthetic package — strong underlying structure paired with refined surface features creates an appearance that is both conventionally attractive and uniquely striking. The balance between boldness and elegance in your proportions is particularly noteworthy and elevates your overall score significantly.",
  "From a structural standpoint, your face is built on an excellent foundation. The jawline, cheekbones, and facial thirds create a strong architectural base, while your softer features — eyes, lips, and skin — add warmth and approachability. The result is a highly balanced face that scores well across both structural and expressive dimensions.",
  "This analysis reveals an exceptionally well-proportioned face with strong scores across nearly every measured category. Your feature quality is high, your symmetry is well above average, and the overall harmony of your appearance creates a powerful aesthetic impression. You are clearly in the upper echelon of facial attractiveness on our scale.",
];

const STRENGTHS_POOL = [
  "Exceptional facial symmetry that creates a naturally harmonious and pleasing appearance",
  "Well-defined bone structure that provides a strong, attractive facial foundation",
  "Highly expressive and beautifully shaped eye area that serves as a natural focal point",
  "Excellent facial thirds balance following classical golden ratio proportions",
  "Striking cheekbone prominence that creates natural dimension and sculptural quality",
  "Clean, sharp jawline that gives the lower face a confident and attractive silhouette",
  "Well-proportioned nose that anchors the midface without overpowering other features",
  "Full, symmetrically shaped lips with excellent cupid's bow definition",
  "Luminous, clear skin tone that enhances every surrounding facial feature",
  "Strong overall facial harmony — all features work together in seamless aesthetic unity",
  "Photogenic facial structure that captures beautifully in photography",
  "Ideal chin projection that completes the lower face with elegant structure",
  "Well-maintained grooming that amplifies and sharpens your natural features",
  "Excellent hairline shape that frames the forehead in perfect proportion",
  "Natural facial expressiveness that adds warmth and approachability to strong bone structure",
];

const IMPROVEMENTS_POOL = [
  { title: "Skincare Consistency", description: "Establishing a consistent AM/PM routine with SPF, Vitamin C serum, and retinol would further elevate your already strong skin quality to exceptional." },
  { title: "Brow Architecture", description: "A professional brow mapping session could refine the arch and tail of your brows, adding even more definition and frame to your eye area." },
  { title: "Hair Volume & Texture", description: "Adding volume at the crown through styling or product choice would further enhance your facial proportions and frame your face more dynamically." },
  { title: "Lighting Awareness", description: "Learning your best light direction (typically 45° from the front) would significantly boost your photogenic output — your structure rewards good lighting beautifully." },
  { title: "Jaw Muscle Development", description: "Light mewing practice and chewing exercises over time can further sharpen an already defined jawline and enhance lower-face structure." },
  { title: "Sleep & Hydration", description: "Optimizing sleep quality and hydration will reduce any under-eye shadow and maintain the skin radiance that is already a clear aesthetic asset." },
  { title: "Posture & Neck Alignment", description: "Good posture and neck alignment naturally accentuates your jaw and cheekbone structure, making an already strong bone profile even more visible." },
  { title: "Color Coordination", description: "Wearing colors that complement your skin undertone will make your complexion appear even more vibrant and draw attention to your best facial features." },
  { title: "Grooming Precision", description: "Keeping brows, facial hair, and hairline meticulously maintained will ensure your strong bone structure is always framed at its best." },
  { title: "Photography Angles", description: "Experimenting with a slight chin-down, eyes-forward pose will engage your cheekbones and jaw simultaneously — your best angles are genuinely stunning." },
  { title: "Sun Protection", description: "Consistent SPF use will preserve your current excellent skin quality and prevent any tonal unevenness from developing over time." },
  { title: "Facial Massage", description: "Regular gua sha or facial massage promotes lymphatic drainage, which can further define your already strong jawline and reduce any facial puffiness." },
];

const PHOTO_TIPS_POOL = [
  "Shoot at eye level or slightly above — this angle accentuates your cheekbones and jaw simultaneously for maximum impact.",
  "Natural golden-hour lighting (1 hour after sunrise or before sunset) will make your skin tone and bone structure look extraordinary.",
  "A slight chin-forward-and-down movement brings out your jawline definition beautifully — practice this in the mirror before your next shoot.",
  "Three-quarter angle shots (45° from straight-on) showcase your profile depth and cheekbone projection at their absolute best.",
  "Soft, diffused window light from a single direction creates the kind of natural shadow that makes bone structure look sculpted and premium.",
  "A neutral or slightly warm background will keep the focus on your face and ensure your skin tone reads correctly in photos.",
  "Relaxed, slightly parted lips with a controlled smile engages your eye area naturally — avoid forcing expressions for the most natural result.",
  "Shoot in portrait mode (or use a 50–85mm equivalent lens) to prevent any wide-angle distortion that can subtly alter facial proportions.",
  "Keeping hair off the face for at least some shots will reveal your full bone structure — your facial architecture is strong enough to stand alone.",
  "High-quality ring light or a professional softbox at 45° produces the kind of even, flattering illumination that makes every feature read clearly.",
  "Posture matters enormously — elongating your neck and keeping shoulders back will enhance your jawline and give photos an effortlessly confident quality.",
  "Experiment with slight head tilts (10–15°) — this small adjustment often reveals your most photogenic angle and adds natural interest to portraits.",
  "Clean, solid-color clothing at the collar removes distraction and ensures your face and neck structure remain the visual focal point.",
  "Shoot in RAW or the highest quality JPEG setting available — your face rewards high-resolution capture where fine details enhance rather than detract.",
];

// ── Random result generator ────────────────────────────────────────────────

function generateResult() {
  const scores = {
    symmetry: randScore(),
    facial_thirds: randScore(),
    eye_area: randScore(),
    nose_harmony: randScore(),
    lip_proportions: randScore(),
    jawline: randScore(),
    chin: randScore(),
    cheekbone_structure: randScore(),
    skin_texture: randScore(),
    hairline: randScore(),
    grooming: randScore(),
    overall_harmony: randScore(),
  };

  const vals = Object.values(scores);
  const overall_score = Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;

  let rating_label: string;
  if (overall_score >= 9.5) rating_label = "EXCEPTIONAL";
  else if (overall_score >= 8.5) rating_label = "VERY HIGH";
  else if (overall_score >= 8.0) rating_label = "HIGH";
  else if (overall_score >= 7.0) rating_label = "GOOD";
  else rating_label = "ABOVE AVERAGE";

  // Pick 5 unique strengths
  const shuffledStrengths = [...STRENGTHS_POOL].sort(() => Math.random() - 0.5);
  const strengths = shuffledStrengths.slice(0, 5);

  // Pick 4 unique improvements
  const shuffledImprovements = [...IMPROVEMENTS_POOL].sort(() => Math.random() - 0.5);
  const improvements = shuffledImprovements.slice(0, 4).map((imp, i) => ({
    rank: i + 1,
    title: imp.title,
    description: imp.description,
  }));

  // Pick 5 unique photo tips
  const shuffledTips = [...PHOTO_TIPS_POOL].sort(() => Math.random() - 0.5);
  const photo_tips = shuffledTips.slice(0, 5);

  const photogenic_score = randScore();

  return {
    overall_score,
    rating_label,
    summary: pick(SUMMARY_POOL),
    metrics: {
      symmetry: { score: scores.symmetry, description: pick(SYMMETRY_DESC) },
      facial_thirds: { score: scores.facial_thirds, description: pick(FACIAL_THIRDS_DESC) },
      eye_area: { score: scores.eye_area, description: pick(EYE_AREA_DESC) },
      nose_harmony: { score: scores.nose_harmony, description: pick(NOSE_HARMONY_DESC) },
      lip_proportions: { score: scores.lip_proportions, description: pick(LIP_DESC) },
      jawline: { score: scores.jawline, description: pick(JAWLINE_DESC) },
      chin: { score: scores.chin, description: pick(CHIN_DESC) },
      cheekbone_structure: { score: scores.cheekbone_structure, description: pick(CHEEKBONE_DESC) },
      skin_texture: { score: scores.skin_texture, description: pick(SKIN_DESC) },
      hairline: { score: scores.hairline, description: pick(HAIRLINE_DESC) },
      grooming: { score: scores.grooming, description: pick(GROOMING_DESC) },
      overall_harmony: { score: scores.overall_harmony, description: pick(HARMONY_DESC) },
    },
    photogenic_potential: {
      score: photogenic_score,
      description: pick(PHOTOGENIC_DESC),
    },
    strengths,
    improvements,
    photo_tips,
    error: null,
  };
}

// ── Route handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return Response.json({ error: "NO_IMAGE", message: "No image file provided." }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "INVALID_TYPE", message: "Please upload a JPG, PNG, or WebP image." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return Response.json(
        { error: "FILE_TOO_LARGE", message: "Image must be under 5MB." },
        { status: 400 }
      );
    }

    // Simulate a brief processing delay for realism
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    return Response.json(generateResult());
  } catch (err) {
    console.error("[analyze] unexpected error:", err);
    return Response.json(
      { error: "SERVER_ERROR", message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
