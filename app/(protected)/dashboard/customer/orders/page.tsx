"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { paymentService } from "@/services/payment.service";
import { toast } from "sonner"; // or react-hot-toast

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ orderId }: { orderId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success?orderId=${orderId}`,
      },
    });

    if (error) {
      toast.error(error.message || "Payment failed!");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function PayOrderPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // ব্যাকএন্ড থেকে Payment Intent (Client Secret) আনবে
    paymentService.createPaymentIntent(orderId)
      .then((res) => setClientSecret(res.clientSecret))
      .catch(() => toast.error("Failed to initialize payment session"));
  }, [orderId]);

  if (!clientSecret) {
    return <div className="text-center py-20 font-medium">Loading Payment Gateway...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm orderId={orderId} />
    </Elements>
  );
}