'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { FormData } from './submit-form';
import { generatePKCEPair } from '@/utils/faydaUtils';

export const MainSection: React.FC<{
  step: number;
  formData: FormData;
  handleInputChange: (field: string, value: string | boolean) => void;
  handleNext: () => void;
  isStepValid: boolean;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}> = ({
  step,
  formData,
  handleInputChange,
  handleNext,
  isStepValid,
  setFormData,
}) => {
  console.log('client id', process.env.NEXT_PUBLIC_CLIENT_ID!);
  console.log('redirect url', process.env.NEXT_PUBLIC_REDIRECT_URI!);
  console.log('sadsadas', process.env.NEXT_PUBLIC_AUTHORIZATION_ENDPOINT!);

  // url
  const generateSignInUrl = async () => {
    const { codeChallenge } = await generatePKCEPair();

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
      response_type: 'code',
      scope: 'openid profile email',
      acr_values: 'mosip:idp:acr:generated-code',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      display: 'page',
      nonce: 'g4DEuje5Fx57Vb64dO4oqLHXGT8L8G7g',
      state: 'ptOO76SD',
      ui_locales: 'en',
    });

    console.log('this is params', params);

    return `${process.env
      .NEXT_PUBLIC_AUTHORIZATION_ENDPOINT!}?${params.toString()}`;
  };

  switch (step) {
    case 1:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Fayda ID Verification</CardTitle>
            <CardDescription>Verify your identity to proceed</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 border-emerald-200 bg-emerald-50">
              <Shield className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800">
                <strong>Fayda ID Verification Required:</strong> Click below to
                authenticate with Fayda Digital ID.
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => {
                const url = generateSignInUrl();
                console.log('url', url);
                window.location.href = `${url}`;
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-600"
            >
              Verify with Fayda
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid}
              className="mt-4 w-full"
            >
              Next
            </Button>
          </CardContent>
        </Card>
      );
    case 2:
      return (
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Startup Information</CardTitle>
              <CardDescription>
                Provide detailed information about your startup for review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startupName">Startup Name *</Label>
                      <Input
                        id="startupName"
                        placeholder="EthioPay"
                        value={formData.startupName}
                        onChange={(e) =>
                          handleInputChange('startupName', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://yourstartu.com"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange('website', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sector">Sector *</Label>
                      <Select
                        value={formData.sector}
                        onValueChange={(value) =>
                          handleInputChange('sector', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fintech">FinTech</SelectItem>
                          <SelectItem value="agriculture">
                            Agriculture
                          </SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="energy">Clean Energy</SelectItem>
                          <SelectItem value="logistics">Logistics</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Select
                        value={formData.location}
                        onValueChange={(value) =>
                          handleInputChange('location', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="addis-ababa">
                            Addis Ababa
                          </SelectItem>
                          <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
                          <SelectItem value="mekelle">Mekelle</SelectItem>
                          <SelectItem value="hawassa">Hawassa</SelectItem>
                          <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                          <SelectItem value="adama">Adama</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Briefly describe what your startup does..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange('description', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Founder Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Founder Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="founderName">Full Name *</Label>
                      <Input
                        id="founderName"
                        placeholder="Meron Tadesse"
                        value={formData.founderName}
                        onChange={(e) =>
                          handleInputChange('founderName', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founderRole">Role *</Label>
                      <Input
                        id="founderRole"
                        placeholder="CEO & Founder"
                        value={formData.founderRole}
                        onChange={(e) =>
                          handleInputChange('founderRole', e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pitch">Detailed Pitch *</Label>
                    <Textarea
                      id="pitch"
                      placeholder="Provide a comprehensive description of your startup..."
                      rows={6}
                      value={formData.pitch}
                      onChange={(e) =>
                        handleInputChange('pitch', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Legal Compliance */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Legal Compliance
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="startup-law"
                        checked={formData.startupLaw}
                        onCheckedChange={(val) =>
                          setFormData((prev) => ({
                            ...prev,
                            startupLaw: val === true,
                          }))
                        }
                      />
                      <Label htmlFor="startup-law" className="text-sm">
                        I confirm that my startup meets the requirements of
                        Ethiopia&apos;s national Startup Law *
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fayda-id"
                        checked={formData.faydaId}
                        onCheckedChange={(val) =>
                          setFormData((prev) => ({
                            ...prev,
                            faydaId: val === true,
                          }))
                        }
                      />
                      <Label htmlFor="fayda-id" className="text-sm">
                        I have completed Fayda ID verification *
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={(val) =>
                          setFormData((prev) => ({
                            ...prev,
                            terms: val === true,
                          }))
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{' '}
                        <Link
                          href="#"
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link
                          href="#"
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          Privacy Policy
                        </Link>{' '}
                        *
                      </Label>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  size="lg"
                >
                  Submit for Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Invalid Step</CardTitle>
            <CardDescription>
              Please start from the verification step.
            </CardDescription>
          </CardHeader>
        </Card>
      );
  }
};
