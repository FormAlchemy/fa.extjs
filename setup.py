from setuptools import setup, find_packages

version = '0.9.4'

long_description = open("README.txt").read()
long_description += """
CHANGES
==========
"""
long_description += open("CHANGES.txt").read()

setup(name='fa.extjs',
      version=version,
      description="jQuery widgets for formalchemy",
      long_description=long_description,
      # Get more strings from http://www.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pylons",
        "Topic :: Internet :: WWW/HTTP",
        ],
      keywords='extjs formalchemy pyramid',
      author='Gael Pasgrimaud',
      author_email='gael@gawel.org',
      url='http://docs.formalchemy.org/fa.jquery/index.html',
      license='MIT',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['fa'],
      message_extractors = { 'fa/extjs': [
             ('*.py', 'lingua_python', None ),
             ('templates/**.pt', 'chameleon_xml', None ),
             ]},
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          'FormAlchemy',
          'pyramid_formalchemy',
          'pyramid',
          'simplejson',
          'fanstatic',
          'js.extjs',
      ],
      entry_points="""
      [fanstatic.libraries]
      fa.extjs = fa.extjs.fanstatic_resources:library
      """,
      )
