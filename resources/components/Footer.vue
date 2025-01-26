<template>
  <footer class="bg-white">
    <Container>
      <div class="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
        <div class="flex gap-x-6">
          <!-- social media accounts coming soon -->
          <a class="h-6 w-6 dark:text-slate-200 text-slate-400 hover:text-slate-500 transition ease-in-out duration-150 group" aria-label="ICE Tracker on Twitter" href="https://twitter.com/chrisbbreuer" target="_blank">
            <!-- <i class="h-6 w-6 dark:text-slate-200 text-slate-400 hover:text-slate-500 transition ease-in-out duration-150 i-hugeicons-twitter"></i> -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
              <path d="M2 18.5C3.76504 19.521 5.81428 20 8 20C14.4808 20 19.7617 14.8625 19.9922 8.43797L22 4.5L18.6458 5C17.9407 4.37764 17.0144 4 16 4C13.4276 4 11.5007 6.51734 12.1209 8.98003C8.56784 9.20927 5.34867 7.0213 3.48693 4.10523C2.25147 8.30185 3.39629 13.3561 6.5 16.4705C6.5 17.647 3.5 18.3488 2 18.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            </svg>
          </a>

          <a class="h-6 w-6 dark:text-slate-200 text-slate-400 hover:text-slate-500 transition ease-in-out duration-150 group" aria-label="ICE Tracker on Bluesky" href="https://bsky.app/profile/ice-tracker.org" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" >
              <path d="M12 11.4963C11.8936 11.2963 7.45492 3 3.50417 3C1.33647 3 2.00456 8 2.50443 10.5C2.70653 11.5108 3.50417 14.5 8.003 14C8.003 14 4.00404 14.5 4.00404 17C4.00404 18.5 6.50339 21 8.50287 21C10.4606 21 11.9391 16.6859 12 16.5058C12.0609 16.6859 13.5394 21 15.4971 21C17.4966 21 19.996 18.5 19.996 17C19.996 14.5 15.997 14 15.997 14C20.4958 14.5 21.2935 11.5108 21.4956 10.5C21.9954 8 22.6635 3 20.4958 3C16.5451 3 12.1064 11.2963 12 11.4963Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            </svg>
          </a>

          <a class="h-6 w-6 dark:text-slate-200 text-slate-400 hover:text-slate-500 transition ease-in-out duration-150 group" aria-label="Ice Tracker on GitHub" href="https://github.com/stacksjs/ice-tracker" target="_blank">
            <!-- <i class="h-6 w-6 dark:text-slate-200 text-slate-400 hover:text-slate-500 transition ease-in-out duration-150 i-hugeicons-github"></i> -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
              <path d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>

        <p class="mt-6 text-sm text-slate-500 sm:mt-0">
          Built with <a href="https://github.com/stacksjs/stacks" class="text-slate-700 hover:text-slate-900 font-semibold">Stacks.js</a>
        </p>
      </div>
    </Container>
  </footer>
</template>
