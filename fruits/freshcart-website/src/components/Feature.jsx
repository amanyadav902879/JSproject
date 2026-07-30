import { HomeIcon, HeartIcon, HandRaisedIcon, ShieldCheckIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Safe Shelter',
    description:
      'Clean, comfortable living spaces with 24/7 supervision and security for our elderly residents and children.',
    icon: HomeIcon,
  },
  {
    name: 'Nutritious Meals',
    description:
      'Three balanced meals daily, prepared with care by our dedicated kitchen staff for every resident.',
    icon: HeartIcon,
  },
  {
    name: 'Medical Care',
    description:
      'Regular health checkups and access to medical treatment facilities to keep our family healthy.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Counseling Services',
    description:
      'Emotional support and counseling sessions dedicated to the mental well-being of our residents.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Education Support',
    description:
      'Tutoring and educational guidance for the orphaned children under our care, building their future.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Holistic Activities',
    description:
      'Yoga, meditation, gardening, and cultural programs that bring joy and purpose to daily life.',
    icon: SparklesIcon,
  },
]

function Feature() {
  return (
    <div className="bg-gradient-to-b from-teal-800 via-teal-900 to-teal-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-amber-400">Our Services</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
            Comprehensive Care for Our Family
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            We offer completely free of cost care — comfortable living spaces, nutritious meals,
            medical support, and a loving, family-like environment for elderly residents and
            orphaned children.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-500">
                    <feature.icon aria-hidden="true" className="size-6 text-teal-900" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Feature