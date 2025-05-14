
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "كيف أقوم بحجز موعد مع طبيب؟",
      answer:
        "يمكنك حجز موعد مع طبيب بسهولة من خلال البحث عن التخصص المناسب، واختيار الطبيب المناسب، ثم النقر على زر 'حجز موعد'. بعدها، اختر التاريخ والوقت المناسبين وأكمل معلومات الحجز.",
    },
    {
      question: "هل يمكنني إلغاء أو تغيير موعدي؟",
      answer:
        "نعم، يمكنك إلغاء أو تغيير موعدك من خلال الذهاب إلى صفحة 'مواعيدي' في ملفك الشخصي، واختيار الموعد الذي تريد تغييره أو إلغائه، ثم اتباع التعليمات.",
    },
    {
      question: "كيف أستفيد من العروض والخصومات؟",
      answer:
        "للاستفادة من العروض والخصومات، يمكنك تصفح قسم 'العروض والخصومات' في الصفحة الرئيسية. عند اختيار عرض معين، سيتم تطبيق الخصم تلقائياً عند إتمام الحجز باستخدام الرمز الترويجي المرفق.",
    },
    {
      question: "ما هي خدمة الاستشارات الفورية؟",
      answer:
        "خدمة الاستشارات الفورية تتيح لك التواصل مباشرة مع الأطباء المتاحين حالياً عبر مكالمة فيديو. يمكنك الوصول إلى هذه الخدمة من خلال قسم 'أطباء متاحون الآن' واختيار 'استشارة فورية'.",
    },
    {
      question: "كيف أقوم بطرح سؤال طبي؟",
      answer:
        "يمكنك طرح سؤال طبي من خلال الانتقال إلى صفحة 'الأسئلة والاستشارات' وملء نموذج السؤال. سيتم الإجابة على استفسارك من قبل أحد الأطباء المختصين في أقرب وقت ممكن.",
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">الأسئلة الشائعة</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-right text-sm font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
