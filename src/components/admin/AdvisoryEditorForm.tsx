import React, { useEffect, useState } from 'react';
import { FileText, Info, LoaderCircle, Save, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { AdvisoryCard } from '../galiyat/AdvisoryCard';
import {
  ADVISORY_CATEGORIES,
  ADVISORY_PRIORITIES,
  ALL_GALIYAT_LABEL,
  GALIYAT_LOCATIONS,
} from '../../data/galiyatAdvisoryData';
import { ADVISORY_TEMPLATES, type AdvisoryTemplate } from '../../data/advisoryTemplates';
import { isAdvisoryScheduled } from '../../services/galiyatAdvisoryService';
import type {
  AdvisoryCategory,
  AdvisoryPriority,
  GaliyatLocationId,
  TravelAdvisory,
} from '../../types/galiyat';

export interface AdvisoryEditorFormProps {
  /** Advisory being created (blank draft) or edited (existing record). */
  initial: TravelAdvisory;
  mode: 'create' | 'edit';
  saving: boolean;
  onSave: (advisory: TravelAdvisory) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-lg border border-brand-light-border bg-white px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-light-muted focus:outline-none focus:ring-2 focus:ring-brand-blue-200';

/** ISO timestamp -> value for <input type="datetime-local"> (local time). */
function toDateTimeInputValue(iso?: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

/** <input type="datetime-local"> value -> ISO string (null when empty). */
function fromDateTimeInputValue(value: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function validateAdvisory(draft: TravelAdvisory): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!draft.reference.trim()) errors.reference = 'Reference number is required.';
  if (!draft.titleEn.trim()) errors.titleEn = 'English title is required.';
  if (!draft.titleUr.trim()) errors.titleUr = 'Urdu title is required.';
  if (!draft.descriptionEn.trim()) errors.descriptionEn = 'English description is required.';
  if (!draft.descriptionUr.trim()) errors.descriptionUr = 'Urdu description is required.';
  if (!draft.issuedAt) errors.issuedAt = 'Issue date and time is required.';

  if (
    draft.expiresAt &&
    draft.issuedAt &&
    new Date(draft.expiresAt).getTime() <= new Date(draft.issuedAt).getTime()
  ) {
    errors.expiresAt = 'Expiry must be later than the issue date.';
  }

  return errors;
}

const Field: React.FC<{
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ label, htmlFor, error, hint, className, children }) => (
  <div className={cn('space-y-1.5', className)}>
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-bold uppercase tracking-wider text-brand-light-muted"
    >
      {label}
    </label>
    {children}
    {error ? (
      <p className="text-xs font-medium text-red-600">{error}</p>
    ) : hint ? (
      <p className="text-xs text-brand-light-muted">{hint}</p>
    ) : null}
  </div>
);

const SectionTitle: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => (
  <div className="border-b border-brand-light-border pb-2">
    <h3 className="text-sm font-bold text-brand-dark">{title}</h3>
    {description && <p className="mt-0.5 text-xs text-brand-light-muted">{description}</p>}
  </div>
);

export const AdvisoryEditorForm: React.FC<AdvisoryEditorFormProps> = ({
  initial,
  mode,
  saving,
  onSave,
  onCancel,
}) => {
  const [draft, setDraft] = useState<TravelAdvisory>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Re-seed the form whenever a different record is opened.
  useEffect(() => {
    setDraft(initial);
    setErrors({});
  }, [initial]);

  // Lock page scroll and allow Escape to close while the dialog is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  const update = <K extends keyof TravelAdvisory>(key: K, value: TravelAdvisory[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const hasTypedText = Boolean(
    draft.titleEn.trim() ||
      draft.titleUr.trim() ||
      draft.descriptionEn.trim() ||
      draft.descriptionUr.trim()
  );

  const applyTemplate = (template: AdvisoryTemplate) => {
    if (
      hasTypedText &&
      !window.confirm('Replace the current advisory text with this template?')
    ) {
      return;
    }

    setDraft((prev) => ({
      ...prev,
      categoryId: template.categoryId,
      priority: template.priority,
      titleEn: template.titleEn,
      titleUr: template.titleUr,
      descriptionEn: template.descriptionEn,
      descriptionUr: template.descriptionUr,
    }));
    setErrors({});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateAdvisory(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      ...draft,
      reference: draft.reference.trim(),
      titleEn: draft.titleEn.trim(),
      titleUr: draft.titleUr.trim(),
      descriptionEn: draft.descriptionEn.trim(),
      descriptionUr: draft.descriptionUr.trim(),
      // Recommended actions are no longer edited here; anything already stored on
      // the record is carried through unchanged.
      updatedAt: new Date().toISOString(),
      // Once staff save a record it is no longer a labelled sample.
      isDemo: false,
    });
  };

  const controlClass = (hasError: boolean) =>
    cn(inputClass, hasError && 'border-red-300 focus:border-red-400 focus:ring-red-100');

  const scheduledForLater = isAdvisoryScheduled(draft);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-dark/60 p-0 sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="advisory-editor-title"
        className="mx-auto w-full max-w-6xl border border-brand-light-border bg-white shadow-gov-md sm:my-2 sm:rounded-2xl"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-brand-light-border bg-white px-5 py-4 sm:rounded-t-2xl sm:px-6">
          <div className="min-w-0">
            <h2 id="advisory-editor-title" className="text-base font-bold text-brand-dark sm:text-lg">
              {mode === 'create' ? 'Add travel advisory' : 'Edit travel advisory'}
            </h2>
            <p className="mt-0.5 text-xs text-brand-light-muted">
              {mode === 'create'
                ? 'Publish a new advisory for the Galiyat region.'
                : `Updating ${initial.reference || 'this advisory'} — changes go live immediately.`}
            </p>
            {(initial.createdBy || initial.updatedBy) && (
              <p className="mt-1 text-[11px] text-brand-light-muted">
                {initial.createdBy ? `Added by ${initial.createdBy}` : null}
                {initial.createdBy && initial.updatedBy ? ' · ' : null}
                {initial.updatedBy ? `Last edited by ${initial.updatedBy}` : null}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-brand-light-muted transition-colors hover:bg-brand-light-subtle hover:text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-300"
            aria-label="Close form"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="space-y-7">
              {/* ------------------------------ Templates ---------------------------- */}
              <section className="space-y-3 rounded-xl border border-brand-light-border border-s-4 border-s-brand-blue bg-white p-4">
                <div className="flex items-start gap-2.5">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-brand-dark">Quick fill from a template</p>
                    <p className="mt-0.5 text-xs text-brand-light-muted">
                      Pick the closest situation and then adjust the wording. Category, priority,
                      both titles and the recommended actions are filled in for you.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {ADVISORY_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => applyTemplate(template)}
                      className="inline-flex flex-col items-start rounded-lg border border-brand-blue-200 bg-white px-3 py-2 text-start transition-colors hover:border-brand-blue-300 hover:bg-brand-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-300"
                    >
                      <span className="text-xs font-bold text-brand-dark">{template.label}</span>
                      <span className="text-[10px] text-brand-light-muted">{template.hint}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* ------------------------------ Classification ----------------------- */}
              <section className="space-y-4">
                <SectionTitle
                  title="Classification"
                  description="How this advisory is filed and filtered on the public page."
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Reference number"
                    htmlFor="advisory-reference"
                    error={errors.reference}
                    hint="Internal record number, e.g. GLY-ADV-2026-015."
                  >
                    <input
                      id="advisory-reference"
                      type="text"
                      value={draft.reference}
                      onChange={(event) => update('reference', event.target.value)}
                      className={controlClass(Boolean(errors.reference))}
                      placeholder="GLY-ADV-2026-015"
                    />
                  </Field>

                  <Field label="Category" htmlFor="advisory-category">
                    <select
                      id="advisory-category"
                      value={draft.categoryId}
                      onChange={(event) =>
                        update('categoryId', event.target.value as AdvisoryCategory)
                      }
                      className={inputClass}
                    >
                      {ADVISORY_CATEGORIES.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label} — {category.labelUrdu}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Priority" htmlFor="advisory-priority">
                    <select
                      id="advisory-priority"
                      value={draft.priority}
                      onChange={(event) =>
                        update('priority', event.target.value as AdvisoryPriority)
                      }
                      className={inputClass}
                    >
                      {ADVISORY_PRIORITIES.map((priority) => (
                        <option key={priority.id} value={priority.id}>
                          {priority.label} — {priority.labelUrdu}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Affected area" htmlFor="advisory-location">
                    <select
                      id="advisory-location"
                      value={draft.locationId}
                      onChange={(event) =>
                        update('locationId', event.target.value as GaliyatLocationId)
                      }
                      className={inputClass}
                    >
                      <option value="all">{ALL_GALIYAT_LABEL.name}</option>
                      {GALIYAT_LOCATIONS.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name} — {location.nameUrdu}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </section>

              {/* --------------------------------- Text ------------------------------ */}
              <section className="space-y-4">
                <SectionTitle
                  title="Advisory text"
                  description="The public page shows the Urdu text; both languages are stored."
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Title — English" htmlFor="advisory-title-en" error={errors.titleEn}>
                    <input
                      id="advisory-title-en"
                      type="text"
                      value={draft.titleEn}
                      onChange={(event) => update('titleEn', event.target.value)}
                      className={controlClass(Boolean(errors.titleEn))}
                      placeholder="Heavy snowfall — drive with caution"
                    />
                  </Field>

                  <Field label="Title — Urdu" htmlFor="advisory-title-ur" error={errors.titleUr}>
                    <input
                      id="advisory-title-ur"
                      type="text"
                      dir="rtl"
                      lang="ur"
                      value={draft.titleUr}
                      onChange={(event) => update('titleUr', event.target.value)}
                      className={cn(controlClass(Boolean(errors.titleUr)), 'font-arabic')}
                      placeholder="شدید برف باری — احتیاط سے ڈرائیو کریں"
                    />
                  </Field>

                  <Field
                    label="Description — English"
                    htmlFor="advisory-description-en"
                    error={errors.descriptionEn}
                  >
                    <textarea
                      id="advisory-description-en"
                      rows={5}
                      value={draft.descriptionEn}
                      onChange={(event) => update('descriptionEn', event.target.value)}
                      className={cn(controlClass(Boolean(errors.descriptionEn)), 'resize-y')}
                      placeholder="What visitors need to know, in two or three sentences."
                    />
                  </Field>

                  <Field
                    label="Description — Urdu"
                    htmlFor="advisory-description-ur"
                    error={errors.descriptionUr}
                  >
                    <textarea
                      id="advisory-description-ur"
                      rows={5}
                      dir="rtl"
                      lang="ur"
                      value={draft.descriptionUr}
                      onChange={(event) => update('descriptionUr', event.target.value)}
                      className={cn(
                        controlClass(Boolean(errors.descriptionUr)),
                        'resize-y font-arabic'
                      )}
                      placeholder="سیاحوں کے لیے ضروری معلومات، دو تین جملوں میں۔"
                    />
                  </Field>
                </div>
              </section>

              {/* ------------------------------ Dates & status ---------------------- */}
              <section className="space-y-4">
                <SectionTitle
                  title="Dates, scheduling & publishing"
                  description="Everything here is about when the notice is visible."
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Issued on"
                    htmlFor="advisory-issued-at"
                    error={errors.issuedAt}
                    hint="Shown on the public card as “Issued”."
                  >
                    <input
                      id="advisory-issued-at"
                      type="datetime-local"
                      value={toDateTimeInputValue(draft.issuedAt)}
                      onChange={(event) =>
                        update('issuedAt', fromDateTimeInputValue(event.target.value) ?? draft.issuedAt)
                      }
                      className={controlClass(Boolean(errors.issuedAt))}
                    />
                  </Field>

                  <Field
                    label="Expires on (optional)"
                    htmlFor="advisory-expires-at"
                    error={errors.expiresAt}
                    hint="Leave empty for no expiry. Expired advisories leave the public list automatically."
                  >
                    <input
                      id="advisory-expires-at"
                      type="datetime-local"
                      value={toDateTimeInputValue(draft.expiresAt)}
                      onChange={(event) =>
                        update('expiresAt', fromDateTimeInputValue(event.target.value))
                      }
                      className={controlClass(Boolean(errors.expiresAt))}
                    />
                  </Field>

                  <Field
                    label="Publish at (optional)"
                    htmlFor="advisory-publish-at"
                    hint="Leave empty to appear as soon as you save. A future time keeps it hidden until then."
                    className="sm:col-span-2"
                  >
                    <input
                      id="advisory-publish-at"
                      type="datetime-local"
                      value={toDateTimeInputValue(draft.publishAt)}
                      onChange={(event) =>
                        update('publishAt', fromDateTimeInputValue(event.target.value))
                      }
                      className={inputClass}
                    />
                  </Field>
                </div>

                <label
                  htmlFor="advisory-published"
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-light-border bg-brand-light-surface p-3.5"
                >
                  <input
                    id="advisory-published"
                    type="checkbox"
                    checked={draft.isPublished}
                    onChange={(event) => update('isPublished', event.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-light-border accent-brand-blue"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-brand-dark">
                      Publish on the website
                    </span>
                    <span className="mt-0.5 block text-xs text-brand-light-muted">
                      Unpublished advisories stay in this dashboard as drafts.
                    </span>
                  </span>
                </label>

                {scheduledForLater && draft.isPublished && (
                  <p className="flex items-start gap-2 rounded-xl border border-brand-blue-200 bg-brand-blue-50 p-3 text-xs text-brand-blue-800">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    This advisory will stay hidden from visitors until{' '}
                    {new Date(draft.publishAt as string).toLocaleString('en-GB')}.
                  </p>
                )}

                {scheduledForLater && !draft.isPublished && (
                  <p className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    A publication time is set but “Publish on the website” is not ticked — the
                    advisory will stay in the dashboard.
                  </p>
                )}

                {initial.isDemo && (
                  <p className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    This started as a sample advisory. Saving your changes will store it as your own
                    record.
                  </p>
                )}
              </section>
            </div>

            {/* ------------------------------- Live preview ------------------------ */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-brand-light-border bg-brand-light-bg p-3.5 sm:p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-light-muted">
                  Public card preview
                </p>

                <div dir="rtl" lang="ur" className="mt-3">
                  <AdvisoryCard advisory={draft} forceLanguage="ur" showActions={false} />
                </div>

                <p className="mt-3 text-xs leading-relaxed text-brand-light-muted">
                  Advisories appear on the public page in Urdu with English labels — exactly as shown
                  above.
                </p>
              </div>
            </aside>
          </div>

          <footer className="sticky bottom-0 flex flex-col-reverse gap-2.5 border-t border-brand-light-border bg-brand-light-subtle/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <Button type="button" variant="secondary" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={saving}
              leftIcon={
                saving ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="h-4 w-4" aria-hidden="true" />
                )
              }
            >
              {saving ? 'Saving…' : mode === 'create' ? 'Add advisory' : 'Save changes'}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AdvisoryEditorForm;
