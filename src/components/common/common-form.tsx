import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface CustomFormFieldProps {
  label?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export function CustomFormField({
  label,
  name,
  control,
}: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label ? label : name}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PasswordFormField({ control }: { control: Control<any> }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="******"
              autoComplete="password"
              {...field}
              right={
                showPassword ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                )
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ConfirmPasswordFormField({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <FormField
      control={control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="******"
              autoComplete="password"
              {...field}
              right={
                showConfirmPassword ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() =>
                      setShowConfirmPassword((prevState) => !prevState)
                    }
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() =>
                      setShowConfirmPassword((prevState) => !prevState)
                    }
                  />
                )
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
