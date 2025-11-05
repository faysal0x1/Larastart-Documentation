import QuillEditor from '@/components/QuillEditor.jsx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown, FileText, RefreshCw, Trash2, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { IconPicker } from '../../../components/ui/icon-picker.jsx';

export default function GlobalForm({
    title = 'Form',
    description = '',
    initialData = {},
    fields = [],
    submitUrl,
    method = 'post',
    submitLabel = 'Submit',
    cancelUrl = null,
    cancelLabel = 'Cancel',
    onSuccess = null,
    successMessage = 'Form submitted successfully!',
    // New layout props
    layout = 'default', // 'default', 'grid', or 'custom'
    gridCols = 1, // Number of columns in grid layout
    sections = [], // Define form sections with their own layout
    imagePreviews: initialImagePreviews = {},
}) {
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(initialData);

    // State for image previews
    const [imagePreviews, setImagePreviews] = useState({});

    // State to track if form was submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    // State for combobox/searchable select open status
    const [openCombobox, setOpenCombobox] = useState({});

    const isEditing = method.toLowerCase() === 'put';

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        setIsSubmitted(true);

        const formData = new FormData();

        // Append all form values to FormData
        Object.keys(data).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                // Handle arrays for multiselect
                if (Array.isArray(data[key])) {
                    data[key].forEach((value, index) => {
                        formData.append(`${key}[${index}]`, value);
                    });
                } else {
                    formData.append(key, data[key]);
                }
            }
        });

        const options = {
            onSuccess: () => {
                // Show success toast with Sonner
                toast.success(successMessage, {
                    description: successMessage,
                });

                // Reset form for new submissions
                if (!isEditing) {
                    reset();
                    setImagePreviews({});
                }

                // Execute custom success callback if provided
                if (onSuccess) onSuccess();
            },
            onError: (errors) => {
                // Show error toast if there are non-field errors
                if (errors.hasOwnProperty('_error')) {
                    toast.error('Error', {
                        description: errors._error,
                    });
                } else {
                    // Generic error if no specific message
                    toast.error('Form Submission Failed', {
                        description: 'There was an error submitting the form. Please check the highlighted fields.',
                    });
                }

                // Scroll to the first error
                setTimeout(() => {
                    const firstErrorField = document.querySelector('.error-field');
                    if (firstErrorField) {
                        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            },
        };

        const finalUrl = submitUrl.startsWith('http') ? submitUrl : submitUrl.startsWith('/') ? submitUrl : `/${submitUrl}`;

        if (isEditing) {
            put(finalUrl, formData, options);
        } else {
            post(finalUrl, formData, options);
        }
    };

    const handleCancel = () => {
        if (cancelUrl) {
            window.location.href = cancelUrl;
        } else {
            window.history.back();
        }
    };

    // Handle image file selection
    const handleImageChange = (e, name) => {
        const file = e.target.files[0];
        if (file) {
            setData(name, file);

            // Create image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews((prev) => ({
                    ...prev,
                    [name]: e.target.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Clear image and preview
    const clearImage = (name) => {
        setData(name, null);
        setImagePreviews((prev) => {
            const newPreviews = { ...prev };
            delete newPreviews[name];
            return newPreviews;
        });

        // Reset the file input
        const fileInput = document.getElementById(name);
        if (fileInput) fileInput.value = '';
    };

    // Handle multiselect item selection
    const handleMultiselectToggle = (name, value) => {
        const currentValues = Array.isArray(data[name]) ? [...data[name]] : [];

        if (currentValues.includes(value)) {
            setData(
                name,
                currentValues.filter((item) => item !== value),
            );
        } else {
            setData(name, [...currentValues, value]);
        }
    };

    // Remove item from multiselect
    const removeMultiselectItem = (name, value) => {
        if (Array.isArray(data[name])) {
            setData(
                name,
                data[name].filter((item) => item !== value),
            );
        }
    };

    // Initialize image previews for existing images
    useEffect(() => {
        fields.forEach((field) => {
            if (field.type === 'image' && initialData[field.name] && typeof initialData[field.name] === 'string') {
                setImagePreviews((prev) => ({
                    ...prev,
                    [field.name]: initialData[field.name],
                }));
            }
        });
    }, [initialData, fields]);

    const renderField = (field) => {
        const {
            name,
            label,
            type = 'text',
            placeholder = '',
            required = false,
            options = [],
            rows = 3,
            min,
            max,
            step,
            helpText,
            className = '',
            disabled = false,
            accept,
            searchable = false,
        } = field;

        const hasError = !!errors[name];
        const errorClass = hasError ? 'border-red-500 focus:ring-red-500' : '';
        const containerClass = hasError ? 'error-field' : '';

        const commonProps = {
            id: name,
            disabled,
            className: `${className} ${errorClass}`,
        };

        switch (type) {
            case 'text':
            case 'email':
            case 'password':
            case 'number':
            case 'tel':
            case 'url':
                return (
                    <Input
                        {...commonProps}
                        type={type}
                        value={data[name] || ''}
                        onChange={(e) => setData(name, e.target.value)}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        step={step}
                        required={required}
                    />
                );

            case 'textarea':
                return (
                    <Textarea
                        {...commonProps}
                        value={data[name] || ''}
                        onChange={(e) => setData(name, e.target.value)}
                        placeholder={placeholder}
                        rows={rows}
                        required={required}
                    />
                );
            case 'richtext':
                return (
                    <div className={cn('mb-4', errorClass)}>
                        <QuillEditor
                            value={data[name] || ''}
                            onChange={(content) => setData(name, content)}
                            placeholder={placeholder}
                            disabled={disabled}
                            className={className}
                        />
                    </div>
                );
            case 'select':
                if (searchable) {
                    return (
                        <Popover open={openCombobox[name]} onOpenChange={(open) => setOpenCombobox({ ...openCombobox, [name]: open })}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openCombobox[name]}
                                    className={`w-full justify-between ${errorClass}`}
                                >
                                    {data[name]
                                        ? options.find((option) => option.value.toString() === data[name]?.toString())?.label
                                        : placeholder || 'Select an option'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder={`Search ${label}...`} />
                                    <CommandEmpty>No option found.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onSelect={() => {
                                                    setData(name, option.value);
                                                    setOpenCombobox({ ...openCombobox, [name]: false });
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        data[name]?.toString() === option.value.toString() ? 'opacity-100' : 'opacity-0',
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    );
                } else {
                    return (
                        <Select value={data[name]?.toString() || ''} onValueChange={(value) => setData(name, value)} required={required}>
                            <SelectTrigger {...commonProps}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value.toString()}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                }

            case 'multiselect':
                return (
                    <div className="space-y-2">
                        <Popover open={openCombobox[name]} onOpenChange={(open) => setOpenCombobox({ ...openCombobox, [name]: open })}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openCombobox[name]}
                                    className={`w-full justify-between ${errorClass}`}
                                >
                                    {Array.isArray(data[name]) && data[name].length > 0
                                        ? `${data[name].length} selected`
                                        : placeholder || 'Select options'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder={`Search ${label}...`} />
                                    <CommandEmpty>No option found.</CommandEmpty>
                                    <CommandList className="max-h-60 overflow-y-auto">
                                        <CommandGroup>
                                            {options.map((option) => (
                                                <CommandItem
                                                    key={option.value}
                                                    value={option.value.toString()}
                                                    onSelect={() => handleMultiselectToggle(name, option.value.toString())}
                                                >
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            checked={Array.isArray(data[name]) && data[name].includes(option.value.toString())}
                                                            className="mr-2 h-4 w-4"
                                                            onCheckedChange={() => handleMultiselectToggle(name, option.value.toString())}
                                                        />
                                                        {option.label}
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {/* Selected items display */}
                        {Array.isArray(data[name]) && data[name].length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                                {data[name].map((value) => {
                                    const option = options.find((opt) => opt.value.toString() === value);
                                    return (
                                        <Badge key={value} variant="secondary" className="flex items-center gap-1">
                                            {option?.label || value}
                                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeMultiselectItem(name, value)} />
                                        </Badge>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );

            case 'switch':
                return (
                    <div className="flex items-center space-x-2">
                        <Switch {...commonProps} checked={!!data[name]} onCheckedChange={(checked) => setData(name, checked)} required={required} />
                    </div>
                );

            case 'iconPicker':
                return (
                    <div className="flex items-center space-x-2">
                        <IconPicker
                            {...commonProps}
                            value={data[name]?.toString() || ''}
                            onValueChange={(value) => setData(name, value)}
                            required={required}
                        />
                    </div>
                );

            case 'checkbox':
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox {...commonProps} checked={!!data[name]} onCheckedChange={(checked) => setData(name, checked)} required={required} />
                    </div>
                );

            case 'radio':
                return (
                    <RadioGroup
                        {...commonProps}
                        value={data[name]?.toString() || ''}
                        onValueChange={(value) => setData(name, value)}
                        required={required}
                    >
                        <div className="space-y-2">
                            {options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value.toString()} id={`${name}-${option.value}`} />
                                    <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                );

            case 'date':
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${!data[name] ? 'text-muted-foreground' : ''} ${errorClass}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data[name] ? format(new Date(data[name]), 'PPP') : placeholder || 'Select a date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={data[name] ? new Date(data[name]) : undefined}
                                onSelect={(date) => setData(name, date ? format(date, 'yyyy-MM-dd') : null)}
                                disabled={disabled}
                                required={required}
                            />
                        </PopoverContent>
                    </Popover>
                );

            case 'image':
                return (
                    <div className="space-y-4 rounded-md border border-dashed border-gray-800">
                        {/* Upload Area */}
                        <div
                            className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 ${imagePreviews[name] ? 'bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'
                                } p-6 transition-colors duration-200 ${imagePreviews[name] ? 'cursor-default' : 'cursor-pointer'}`}
                            onClick={() => {
                                if (!imagePreviews[name]) {
                                    document.getElementById(`file-input-${name}`).click();
                                }
                            }}
                        >
                            {!imagePreviews[name] ? (
                                <>
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                                        <Upload className="h-6 w-6" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">{label || 'Upload Image'}</p>
                                    <p className="mt-1 text-xs text-gray-500">Click to browse or drag and drop</p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {accept ? `Accepts: ${accept.replace('*', 'all')}` : 'PNG, JPG, GIF up to 10MB'}
                                    </p>
                                </>
                            ) : (
                                <div className="relative w-full">
                                    <div className="flex items-center justify-center overflow-hidden rounded-md">
                                        <img src={imagePreviews[name]} alt={`Preview for ${label}`} className="max-h-64 max-w-full object-contain" />
                                    </div>
                                    <div className="bg-opacity-0 hover:bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-200 hover:opacity-100">
                                        <div className="flex space-x-2">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="secondary"
                                                className="bg-white text-gray-800 hover:bg-gray-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    document.getElementById(`file-input-${name}`).click();
                                                }}
                                            >
                                                <RefreshCw className="mr-1 h-4 w-4" />
                                                Replace
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="destructive"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    clearImage(name);
                                                }}
                                            >
                                                <Trash2 className="mr-1 h-4 w-4" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Input
                                id={`file-input-${name}`}
                                className="sr-only"
                                type="file"
                                name={name}
                                accept={accept || 'image/*'}
                                onChange={(e) => handleImageChange(e, name)}
                                required={required && !data[name]}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* File Info - Show when image is selected */}
                        {imagePreviews[name] && data[name] && (
                            <div className="flex items-center justify-between rounded-md bg-blue-50 p-2 text-sm text-gray-700">
                                <div className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4 text-blue-500" />
                                    <span className="max-w-xs truncate">{data[name].name || 'Image uploaded'}</span>
                                </div>
                                <span className="text-xs text-gray-500">{data[name].size ? `${(data[name].size / 1024).toFixed(1)} KB` : ''}</span>
                            </div>
                        )}

                        {/* Error Message */}
                        {errors && errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
                    </div>
                );

            default:
                return (
                    <Input
                        {...commonProps}
                        type="text"
                        value={data[name] || ''}
                        onChange={(e) => setData(name, e.target.value)}
                        placeholder={placeholder}
                        required={required}
                    />
                );
        }
    };

    // Function to render field with its label and error message
    const renderFieldWithLabel = (field) => {
        const hasError = !!errors[field.name];

        return (
            <div key={field.name} className={`space-y-2 ${hasError ? 'error-field' : ''}`}>
                {field.type !== 'checkbox' && field.type !== 'switch' && (
                    <Label htmlFor={field.name} className={hasError ? 'text-red-500' : ''}>
                        {field.label}
                        {field.required && <span className="ml-1 text-red-500">*</span>}
                    </Label>
                )}

                {renderField(field)}

                {field.type === 'checkbox' || field.type === 'switch' ? (
                    <Label htmlFor={field.name} className={`ml-2 ${hasError ? 'text-red-500' : ''}`}>
                        {field.label}
                        {field.required && <span className="ml-1 text-red-500">*</span>}
                    </Label>
                ) : null}

                {field.helpText && <p className="text-sm text-gray-500">{field.helpText}</p>}

                {hasError && <p className="text-sm text-red-500">{errors[field.name]}</p>}
            </div>
        );
    };

    // Function to render a section
    const renderSection = (section) => {
        const { title, description, fields: sectionFields, layout: sectionLayout = 'default', gridCols: sectionGridCols = 1 } = section;

        // Filter fields that belong to this section
        const fieldsToRender = fields.filter((field) => sectionFields.includes(field.name));

        return (
            <div key={title || Math.random()} className="mb-8">
                {title && (
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">{title}</h3>
                        {description && <p className="text-sm text-gray-500">{description}</p>}
                    </div>
                )}

                {renderFieldsLayout(fieldsToRender, sectionLayout, sectionGridCols)}
            </div>
        );
    };

    // Function to render fields according to specified layout
    const renderFieldsLayout = (fieldsToRender, layoutType = 'default', cols = 1) => {
        switch (layoutType) {
            case 'grid':
                // Calculate grid columns based on cols prop
                const gridColsClass =
                    {
                        1: 'grid-cols-1',
                        2: 'grid-cols-1 md:grid-cols-2',
                        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
                    }[cols] || 'grid-cols-1';

                return <div className={`grid ${gridColsClass} gap-4`}>{fieldsToRender.map((field) => renderFieldWithLabel(field))}</div>;

            case 'custom':
                // Fields are already grouped by sections
                return fieldsToRender.map((field) => renderFieldWithLabel(field));

            default:
                // Default vertical stack layout
                return <div className="space-y-4">{fieldsToRender.map((field) => renderFieldWithLabel(field))}</div>;
        }
    };

    // Main render function
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <CardContent>
                        {sections && sections.length > 0
                            ? // Render by sections if defined
                            sections.map(renderSection)
                            : // Otherwise render all fields with the global layout
                            renderFieldsLayout(fields, layout, gridCols)}
                    </CardContent>

                    <CardFooter className="mt-2 flex justify-center space-x-2">
                        {cancelUrl || cancelLabel !== 'Cancel' ? (
                            <Button type="button" variant="outline" onClick={handleCancel}>
                                {cancelLabel}
                            </Button>
                        ) : null}
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Processing...' : submitLabel}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {/* Include Sonner Toaster component */}
            <Toaster position="top-right" closeButton richColors />
        </>
    );
}
