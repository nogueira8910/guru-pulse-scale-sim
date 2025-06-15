
// Auth page simplificada para não requerer supabase.
// Essa página agora só serve como placeholder.
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login/Sign up indisponível</CardTitle>
        <CardDescription>
          O sistema de autenticação foi removido.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-500">Funcionalidade desativada.</p>
      </CardContent>
    </Card>
  </div>
);

export default Auth;
