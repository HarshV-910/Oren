import { useLocaleStore } from "@/store/useLocaleStore";

export const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.new_arrivals": "New Arrivals",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.search": "Search products...",
    "nav.cart": "Cart",
    "nav.account": "Account",
    "nav.sign_out": "Sign Out",
    "nav.back_store": "Back to Storefront",
    "nav.dashboard": "Dashboard",
    
    // Cart / Checkout
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.summary": "Order Summary",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.tax": "Tax (GST 3%)",
    "cart.total": "Total",
    "cart.checkout_btn": "Proceed to Checkout",
    "cart.discount": "Discount",
    "cart.coupon_placeholder": "Coupon code",
    "cart.free": "FREE",
    
    "checkout.title": "Checkout",
    "checkout.shipping_address": "Shipping Address",
    "checkout.full_name": "Full Name",
    "checkout.phone": "Phone Number",
    "checkout.address": "Address Line",
    "checkout.city": "City",
    "checkout.state": "State / Province",
    "checkout.postal": "Postal / ZIP Code",
    "checkout.country": "Country",
    "checkout.payment_method": "Payment Method",
    "checkout.payment_stripe": "Pay via Stripe",
    "checkout.payment_razorpay": "Pay via Razorpay",
    "checkout.payment_cod": "Cash on Delivery (COD)",
    "checkout.place_order": "Place Order",
    "checkout.success": "Order placed successfully! 🎉",
    "checkout.invoice_title": "Invoice / Receipt",
    "checkout.print_invoice": "Print Invoice",
    
    // Product Detail
    "product.add_cart": "Add to Cart",
    "product.add_wishlist": "Add to Wishlist",
    "product.size": "Select Size",
    "product.description": "Description",
    "product.reviews": "Customer Reviews",
    "product.in_stock": "In Stock",
    "product.out_stock": "Out of Stock",
    "product.size_guide": "Size Guide",
    "product.care_guide": "Care Guide",
    
    // Footer / Misc
    "footer.rights": "All rights reserved.",
    "footer.size_care": "Size & Care Guide",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.tagline": "Handcrafted luxury gold & diamond jewellery. Experience heritage, certified quality, and lifelong luxury.",
  },
  hi: {
    // Navigation
    "nav.home": "मुख्य पृष्ठ",
    "nav.products": "उत्पाद",
    "nav.new_arrivals": "नया आगमन",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "nav.search": "खोजें...",
    "nav.cart": "कार्ट",
    "nav.account": "अकाउंट",
    "nav.sign_out": "साइन आउट",
    "nav.back_store": "स्टोरफ्रंट पर वापस जाएं",
    "nav.dashboard": "डैशबोर्ड",
    
    // Cart / Checkout
    "cart.title": "आपकी कार्ट",
    "cart.empty": "आपकी कार्ट खाली है",
    "cart.summary": "ऑर्डर विवरण",
    "cart.subtotal": "उप-योग",
    "cart.shipping": "शिपिंग",
    "cart.tax": "टैक्स (GST 3%)",
    "cart.total": "कुल योग",
    "cart.checkout_btn": "चेकआउट के लिए आगे बढ़ें",
    "cart.discount": "छूट",
    "cart.coupon_placeholder": "कूपन कोड",
    "cart.free": "मुफ़्त",
    
    "checkout.title": "चेकआउट",
    "checkout.shipping_address": "शिपिंग पता",
    "checkout.full_name": "पूरा नाम",
    "checkout.phone": "फ़ोन नंबर",
    "checkout.address": "पता",
    "checkout.city": "शहर",
    "checkout.state": "राज्य",
    "checkout.postal": "पिन कोड",
    "checkout.country": "देश",
    "checkout.payment_method": "भुगतान का प्रकार",
    "checkout.payment_stripe": "स्ट्राइप द्वारा भुगतान",
    "checkout.payment_razorpay": "रेज़रपे द्वारा भुगतान",
    "checkout.payment_cod": "कैश ऑन डिलीवरी (COD)",
    "checkout.place_order": "ऑर्डर सबमिट करें",
    "checkout.success": "ऑर्डर सफलतापूर्वक सबमिट हो गया! 🎉",
    "checkout.invoice_title": "इनवॉइस / रसीद",
    "checkout.print_invoice": "इनवॉइस प्रिंट करें",
    
    // Product Detail
    "product.add_cart": "कार्ट में जोड़ें",
    "product.add_wishlist": "विशलिस्ट में जोड़ें",
    "product.size": "आकार चुनें",
    "product.description": "विवरण",
    "product.reviews": "ग्राहक समीक्षाएं",
    "product.in_stock": "स्टॉक में है",
    "product.out_stock": "स्टॉक में नहीं है",
    "product.size_guide": "साइज़ गाइड",
    "product.care_guide": "देखभाल गाइड",
    
    // Footer / Misc
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.size_care": "साइज़ और केयर गाइड",
    "footer.privacy": "गोपनीयता नीति",
    "footer.terms": "सेवा की शर्तें",
    "footer.tagline": "हस्तनिर्मित लक्जरी सोने और हीरे के आभूषण। विरासत, प्रमाणित गुणवत्ता और आजीवन विलासिता का अनुभव करें।",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.products": "المنتجات",
    "nav.new_arrivals": "وصل حديثاً",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.search": "البحث عن المنتجات...",
    "nav.cart": "السلة",
    "nav.account": "حسابي",
    "nav.sign_out": "تسجيل الخروج",
    "nav.back_store": "العودة للمتجر",
    "nav.dashboard": "لوحة التحكم",
    
    // Cart / Checkout
    "cart.title": "سلتك",
    "cart.empty": "سلة التسوق فارغة",
    "cart.summary": "ملخص الطلب",
    "cart.subtotal": "المجموع الفرعي",
    "cart.shipping": "الشحن",
    "cart.tax": "الضريبة (3%)",
    "cart.total": "الإجمالي",
    "cart.checkout_btn": "المتابعة لإتمام الطلب",
    "cart.discount": "خصم",
    "cart.coupon_placeholder": "رمز الكوبون",
    "cart.free": "مجاني",
    
    "checkout.title": "إتمام الشراء",
    "checkout.shipping_address": "عنوان الشحن",
    "checkout.full_name": "الاسم الكامل",
    "checkout.phone": "رقم الهاتف",
    "checkout.address": "العنوان",
    "checkout.city": "المدينة",
    "checkout.state": "الولاية / المقاطعة",
    "checkout.postal": "الرمز البريدي",
    "checkout.country": "البلد",
    "checkout.payment_method": "طريقة الدفع",
    "checkout.payment_stripe": "الدفع عبر Stripe",
    "checkout.payment_razorpay": "الدفع عبر Razorpay",
    "checkout.payment_cod": "الدفع عند الاستلام (COD)",
    "checkout.place_order": "إرسال الطلب",
    "checkout.success": "تم تقديم طلبك بنجاح! 🎉",
    "checkout.invoice_title": "الفاتورة / الإيصال",
    "checkout.print_invoice": "طباعة الفاتورة",
    
    // Product Detail
    "product.add_cart": "إضافة إلى السلة",
    "product.add_wishlist": "إضافة للمفضلة",
    "product.size": "اختر المقاس",
    "product.description": "الوصف",
    "product.reviews": "آراء العملاء",
    "product.in_stock": "متوفر في المخزن",
    "product.out_stock": "نفدت الكمية",
    "product.size_guide": "دليل المقاسات",
    "product.care_guide": "دليل العناية",
    
    // Footer / Misc
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.size_care": "دليل المقاسات والعناية",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.tagline": "مجوهرات ذهب وألماس فاخرة مصنوعة يدوياً. تجسيد التراث، الجودة المعتمدة، والفخامة الدائمة.",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.products": "Productos",
    "nav.new_arrivals": "Novedades",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.search": "Buscar productos...",
    "nav.cart": "Carrito",
    "nav.account": "Mi Cuenta",
    "nav.sign_out": "Cerrar Sesión",
    "nav.back_store": "Volver a la Tienda",
    "nav.dashboard": "Panel de Control",
    
    // Cart / Checkout
    "cart.title": "Tu Carrito",
    "cart.empty": "Tu carrito está vacío",
    "cart.summary": "Resumen del Pedido",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Envío",
    "cart.tax": "Impuesto (3%)",
    "cart.total": "Total",
    "cart.checkout_btn": "Proceder al Pago",
    "cart.discount": "Descuento",
    "cart.coupon_placeholder": "Código de cupón",
    "cart.free": "GRATIS",
    
    "checkout.title": "Finalizar Compra",
    "checkout.shipping_address": "Dirección de Envío",
    "checkout.full_name": "Nombre Completo",
    "checkout.phone": "Número de Teléfono",
    "checkout.address": "Dirección",
    "checkout.city": "Ciudad",
    "checkout.state": "Estado / Provincia",
    "checkout.postal": "Código Postal",
    "checkout.country": "País",
    "checkout.payment_method": "Método de Pago",
    "checkout.payment_stripe": "Pagar con Stripe",
    "checkout.payment_razorpay": "Pagar con Razorpay",
    "checkout.payment_cod": "Pago en Efectivo (COD)",
    "checkout.place_order": "Realizar Pedido",
    "checkout.success": "¡Pedido realizado con éxito! 🎉",
    "checkout.invoice_title": "Factura / Recibo",
    "checkout.print_invoice": "Imprimir Factura",
    
    // Product Detail
    "product.add_cart": "Añadir al Carrito",
    "product.add_wishlist": "Añadir a Favoritos",
    "product.size": "Seleccionar Talla",
    "product.description": "Descripción",
    "product.reviews": "Opiniones de Clientes",
    "product.in_stock": "Disponible",
    "product.out_stock": "Agotado",
    "product.size_guide": "Guía de Tallas",
    "product.care_guide": "Guía de Cuidado",
    
    // Footer / Misc
    "footer.rights": "Todos los derechos reservados.",
    "footer.size_care": "Guía de Tallas y Cuidado",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos del Servicio",
    "footer.tagline": "Joyas artesanales de oro y diamantes de lujo. Experimente la herencia, la calidad certificada y el lujo eterno.",
  },
};

export function translate(key: string, fallback?: string): string {
  let lang = "en";
  try {
    const state = useLocaleStore.getState();
    if (state && state.language) {
      lang = state.language;
    }
  } catch (e) {
    // Fallback if accessed outside client lifecycle
  }

  const translatedVal = translations[lang]?.[key];
  return translatedVal !== undefined ? translatedVal : (fallback || key);
}
